/**
 * Interactive Python Code Editor using Pyodide (Python WASM)
 * Provides in-browser Python execution without external dependencies
 */

class CodeEditor {
    constructor() {
        this.pyodide = null;
        this.loading = false;
        this.editors = new Map();
        this.packagesLoaded = false;
        this.environmentReady = false;
        this.preloading = false;
    }

    /**
     * Ensure the Pyodide script is available on the page
     */
    async ensurePyodideScript() {
        if (typeof loadPyodide === 'function') {
            return;
        }

        const existingScript = document.getElementById('pyodide-loader');
        if (existingScript) {
            await new Promise((resolve, reject) => {
                existingScript.addEventListener('load', resolve, { once: true });
                existingScript.addEventListener('error', () => reject(new Error('Failed to load Pyodide script')), { once: true });
            });
            return;
        }

        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.id = 'pyodide-loader';
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Pyodide script'));
            document.head.appendChild(script);
        });
    }

    /**
     * Initialize Pyodide (lazy load when first exercise is opened)
     */
    async initPyodide() {
        if (this.pyodide) return this.pyodide;
        if (this.loading) {
            // Wait for existing load
            while (this.loading) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            return this.pyodide;
        }

        try {
            this.loading = true;
            console.log('Loading Pyodide...');

            await this.ensurePyodideScript();
            
            // Load Pyodide from CDN
            this.pyodide = await loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
            });
            
            console.log('Pyodide loaded successfully');
            return this.pyodide;
        } catch (error) {
            console.error('Failed to load Pyodide:', error);
            throw error;
        } finally {
            this.loading = false;
        }
    }

    async ensurePackages(outputElement = null) {
        if (!this.pyodide || this.packagesLoaded) return;

        if (outputElement) {
            outputElement.textContent = '⏳ Installing Python data libraries... (numpy, pandas, matplotlib, scikit-learn)';
            outputElement.className = 'output-content loading';
        }

        try {
            await this.pyodide.loadPackage(['numpy', 'pandas', 'matplotlib', 'scikit-learn']);
            this.packagesLoaded = true;
            console.log('✅ Pyodide packages ready');
        } catch (pkgError) {
            console.warn('Some Pyodide packages failed to load:', pkgError);
        }
    }

    async preloadEnvironment() {
        if (this.environmentReady || this.preloading) return;

        this.preloading = true;
        try {
            await this.initPyodide();
            await this.ensurePackages();
            this.environmentReady = true;
            console.log('✅ Python environment preloaded');
        } catch (error) {
            console.warn('Pyodide preloading failed (will retry on run):', error);
        } finally {
            this.preloading = false;
        }
    }

    setRunButtonState(exerciseId, disabled) {
        const editor = document.getElementById(`editor-${exerciseId}`);
        if (!editor) return;
        const runButton = editor.querySelector('.btn-run');
        if (runButton) {
            runButton.disabled = disabled;
            runButton.textContent = disabled ? '⏳ Running...' : '▶ Run';
        }
    }

    /**
     * Create an interactive code editor for an exercise
     */
    createEditor(exerciseId, starterCode, hints = [], solution = '') {
        const editorHtml = `
            <div class="interactive-code-editor" id="editor-${exerciseId}">
                <div class="editor-header">
                    <div class="editor-tabs">
                        <button class="editor-tab active" onclick="codeEditor.switchTab('${exerciseId}', 'code')">
                            📝 Code
                        </button>
                        <button class="editor-tab" onclick="codeEditor.switchTab('${exerciseId}', 'hints')">
                            💡 Hints (${hints.length})
                        </button>
                        ${solution ? `
                        <button class="editor-tab" onclick="codeEditor.switchTab('${exerciseId}', 'solution')">
                            ✓ Solution
                        </button>
                        ` : ''}
                    </div>
                    <div class="editor-actions">
                        <button class="btn-editor btn-run" onclick="codeEditor.runCode('${exerciseId}')" title="Run Code (Ctrl+Enter)">
                            ▶ Run
                        </button>
                        <button class="btn-editor btn-reset" onclick="codeEditor.resetCode('${exerciseId}')" title="Reset to starter code">
                            ↻ Reset
                        </button>
                    </div>
                </div>

                <div class="editor-content">
                    <!-- Code Tab -->
                    <div class="editor-panel active" data-panel="code">
                        <textarea 
                            class="code-textarea" 
                            id="code-${exerciseId}"
                            spellcheck="false"
                            placeholder="Write your Python code here..."
                        >${starterCode || '# Write your code here\n'}</textarea>
                    </div>

                    <!-- Hints Tab -->
                    <div class="editor-panel" data-panel="hints">
                        <div class="hints-container">
                            <h4>💡 Hints to Help You</h4>
                            ${hints.length > 0 ? `
                                <ol class="hints-list">
                                    ${hints.map(hint => `<li>${this.escapeHtml(hint)}</li>`).join('')}
                                </ol>
                            ` : '<p>No hints available for this exercise.</p>'}
                        </div>
                    </div>

                    <!-- Solution Tab -->
                    ${solution ? `
                    <div class="editor-panel" data-panel="solution">
                        <div class="solution-container">
                            <h4>✓ Solution Code</h4>
                            <pre class="solution-code"><code>${this.escapeHtml(solution)}</code></pre>
                            <button class="btn-copy" onclick="codeEditor.copySolution('${exerciseId}')">
                                📋 Copy to Editor
                            </button>
                        </div>
                    </div>
                    ` : ''}
                </div>

                <div class="editor-output">
                    <div class="output-header">
                        <span>📤 Output</span>
                        <button class="btn-clear" onclick="codeEditor.clearOutput('${exerciseId}')">Clear</button>
                    </div>
                    <pre class="output-content" id="output-${exerciseId}">Run your code to see output here...</pre>
                </div>
            </div>
        `;

        // Store starter code for reset functionality
        this.editors.set(exerciseId, {
            starterCode: starterCode || '# Write your code here\n',
            solution: solution
        });

        // Kick off environment preload in the background (first editor only)
        if (!this.environmentReady && !this.preloading) {
            this.preloadEnvironment();
        }

        return editorHtml;
    }

    /**
     * Switch between tabs (Code, Hints, Solution)
     */
    switchTab(exerciseId, tabName) {
        const editor = document.getElementById(`editor-${exerciseId}`);
        if (!editor) return;

        // Update tab buttons
        editor.querySelectorAll('.editor-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.textContent.toLowerCase().includes(tabName)) {
                tab.classList.add('active');
            }
        });

        // Update panels
        editor.querySelectorAll('.editor-panel').forEach(panel => {
            panel.classList.remove('active');
            if (panel.getAttribute('data-panel') === tabName) {
                panel.classList.add('active');
            }
        });
    }

    /**
     * Run Python code using Pyodide
     */
    async runCode(exerciseId) {
        const codeTextarea = document.getElementById(`code-${exerciseId}`);
        const outputElement = document.getElementById(`output-${exerciseId}`);
        
        if (!codeTextarea || !outputElement) return;

        const code = codeTextarea.value.trim();
        if (!code) {
            outputElement.textContent = '⚠️ No code to run';
            outputElement.className = 'output-content warning';
            return;
        }

        // Show loading state
        outputElement.textContent = '⏳ Running code...';
        outputElement.className = 'output-content loading';
        this.setRunButtonState(exerciseId, true);

        try {
            // Initialize Pyodide if not already loaded
            if (!this.pyodide) {
                outputElement.textContent = '⏳ Setting up Python environment...\n\n' +
                    'First run: Installing Python (10-20 seconds)\n' +
                    'Installing packages: numpy, pandas, matplotlib...\n' +
                    'Future runs will be instant!';
                await this.initPyodide();
            }

            if (!this.packagesLoaded) {
                await this.ensurePackages(outputElement);
            }

            this.environmentReady = true;

            // Capture stdout
            let output = '';
            this.pyodide.setStdout({
                batched: (text) => {
                    output += text + '\n';
                }
            });

            // Run the code
            const result = await this.pyodide.runPythonAsync(code);
            
            // Display output
            if (output.trim()) {
                outputElement.textContent = output.trim();
            } else if (result !== undefined) {
                outputElement.textContent = String(result);
            } else {
                outputElement.textContent = '✓ Code executed successfully (no output)';
            }
            
            outputElement.className = 'output-content success';

        } catch (error) {
            // Parse error for better display
            let errorMessage = error.message;
            
            // Check for common issues
            if (errorMessage.includes('input')) {
                errorMessage = '❌ Error: input() is not supported in browser Python\n\n' +
                    'Remove input() statements and use hardcoded values instead.\n' +
                    'Example: Instead of `name = input("Name: ")`, use `name = "Alice"`';
            } else if (errorMessage.includes('matplotlib')) {
                errorMessage = '❌ Error: matplotlib.pyplot.show() is not supported\n\n' +
                    'Remove plt.show() - plots automatically appear in notebook environments.\n' +
                    'In browser, you can create plots but cannot display them interactively.';
            } else {
                errorMessage = `❌ Error:\n${errorMessage}`;
            }
            
            outputElement.textContent = errorMessage;
            outputElement.className = 'output-content error';
            console.error('Code execution error:', error);
        }
        finally {
            this.setRunButtonState(exerciseId, false);
        }
    }

    /**
     * Reset code to starter code
     */
    resetCode(exerciseId) {
        const codeTextarea = document.getElementById(`code-${exerciseId}`);
        const editorData = this.editors.get(exerciseId);
        
        if (codeTextarea && editorData) {
            if (confirm('Reset code to starter code? Your changes will be lost.')) {
                codeTextarea.value = editorData.starterCode;
                this.clearOutput(exerciseId);
            }
        }
    }

    /**
     * Copy solution to editor
     */
    copySolution(exerciseId) {
        const codeTextarea = document.getElementById(`code-${exerciseId}`);
        const editorData = this.editors.get(exerciseId);
        
        if (codeTextarea && editorData && editorData.solution) {
            codeTextarea.value = editorData.solution;
            this.switchTab(exerciseId, 'code');
            alert('Solution copied to editor! Now try to run it.');
        }
    }

    /**
     * Clear output panel
     */
    clearOutput(exerciseId) {
        const outputElement = document.getElementById(`output-${exerciseId}`);
        if (outputElement) {
            outputElement.textContent = 'Run your code to see output here...';
            outputElement.className = 'output-content';
        }
    }

    /**
     * Escape HTML for safe display
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global instance
const codeEditor = new CodeEditor();

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Enter or Cmd+Enter to run code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeTextarea = document.activeElement;
        if (activeTextarea && activeTextarea.classList.contains('code-textarea')) {
            const exerciseId = activeTextarea.id.replace('code-', '');
            codeEditor.runCode(exerciseId);
            e.preventDefault();
        }
    }
});
