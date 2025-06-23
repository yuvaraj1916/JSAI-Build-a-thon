import { LitElement, html } from 'lit';
import { loadMessages, saveMessages, clearMessages } from '../utils/chatStore.js';
import './chat.css'; // Import the CSS file

export class ChatInterface extends LitElement {
  static get properties() {
    return {
      messages: { type: Array },
      inputMessage: { type: String },
      isLoading: { type: Boolean },
      isRetrieving: { type: Boolean },
      ragEnabled: { type: Boolean },
      chatMode: { type: String } // Add new property for mode
    };
  }



  constructor() {
    super();
    this.messages = [];
    this.inputMessage = '';
    this.isLoading = false;
    this.isRetrieving = false;
    this.ragEnabled = true; // Enable by default
    this.chatMode = "basic"; // Set default chat mode
  }

  // Render into light DOM so external CSS applies
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    // Load chat history from localStorage when component is added to the DOM
    this.messages = loadMessages();
  }

  updated(changedProps) {
    // Save chat history to localStorage whenever messages change
    if (changedProps.has('messages')) {
      saveMessages(this.messages);
    }
  }



  render() {
    return html`
    <div class="chat-container">
      <div class="chat-header">
        <button class="clear-cache-btn" @click=${this._clearCache}> 🧹Clear Chat</button>
            <div class="mode-selector">
              <label>Mode:</label>
                <select @change=${this._handleModeChange}>
                  <option value="basic" ?selected=${this.chatMode === 'basic'}>Basic AI</option>
                  <option value="agent" ?selected=${this.chatMode === 'agent'}>Agent</option>
                </select>
            </div>
      <label class="rag-toggle ${this.chatMode === 'agent' ? 'disabled' : ''}">
        <input type="checkbox" 
          ?checked=${this.ragEnabled} 
          @change=${this._toggleRag}
          ?disabled=${this.chatMode === 'agent'}>
      Use Employee Handbook
    </label>
      </div>
      <div class="chat-messages">
        ${this.messages.map(message => html`
          <div class="message ${message.role === 'user' ? 'user-message' : 'ai-message'}">
            <div class="message-content">
              <span class="message-sender">${message.role === 'user' ? 'You' : (this.chatMode === 'agent' ? 'Agent' : 'AI')}</span>
              <p>${message.content}</p>
              ${this.ragEnabled && message.sources && message.sources.length > 0 ? html`
                <details class="sources">
                  <summary>📚 Sources</summary>
                  <div class="sources-content">
                    ${message.sources.map(source => html`<p>${source}</p>`)}
                  </div>
                </details>
              ` : ''}
            </div>
          </div>
        `)}
        ${this.isRetrieving ? html`
          <div class="message system-message">
            <p>📚 Searching employee handbook...</p>
          </div>
        ` : ''}
        ${this.isLoading && !this.isRetrieving ? html`
          <div class="message ai-message">
            <div class="message-content">
              <span class="message-sender">AI</span>
              <p>Thinking...</p>
            </div>
          </div>
        ` : ''}
      </div>
      <div class="chat-input">
  <input 
    type="text" 
    placeholder=${this.chatMode === 'basic' ?
        "Ask about company policies, benefits, etc..." :
        "Ask Agent"}
    .value=${this.inputMessage}
    @input=${this._handleInput}
    @keyup=${this._handleKeyUp}
  />
        <button @click=${this._sendMessage} ?disabled=${this.isLoading || !this.inputMessage.trim()}>
          Send
        </button>
      </div>
    </div>
  `;
  }

  _handleModeChange(e) {
    const newMode = e.target.value;
    if (newMode !== this.chatMode) {
      this.chatMode = newMode;

      // Disable RAG when switching to agent mode
      if (newMode === 'agent') {
        this.ragEnabled = false;
      }

      clearMessages();
      this.messages = [];
    }
  }

  _toggleRag(e) {
    this.ragEnabled = e.target.checked;
  }



  // Clear chat history from localStorage and UI
  _clearCache() {
    clearMessages();
    this.messages = [];
  }

  // Update inputMessage state as the user types
  _handleInput(e) {
    this.inputMessage = e.target.value;
  }

  // Send message on Enter key if not loading
  _handleKeyUp(e) {
    if (e.key === 'Enter' && this.inputMessage.trim() && !this.isLoading) {
      this._sendMessage();
    }
  }

  // Handle sending a message and receiving a response
  async _sendMessage() {
    if (!this.inputMessage.trim() || this.isLoading) return;

    // Add user's message to the chat
    const userMessage = {
      role: 'user',
      content: this.inputMessage
    };

    this.messages = [...this.messages, userMessage];
    const userQuery = this.inputMessage;
    this.inputMessage = '';
    this.isLoading = true;

    try {
      // Simulate AI response (replace with real API call later)
      const responseData = await this._apiCall(userQuery);

      // Add AI's response to the chat
      this.messages = [
        ...this.messages,
        { role: 'assistant', content: responseData.reply, sources: responseData.sources }
      ];
    } catch (error) {
      // Handle errors gracefully
      console.error('Error calling model:', error);
      this.messages = [
        ...this.messages,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ];
    } finally {
      this.isLoading = false;
    }
  }

  // Simulate an AI response (placeholder for future integration)
  async _apiCall(message) {
    const res = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        useRAG: this.ragEnabled,
        mode: this.chatMode // Send the selected mode to the server
      }),
    });
    const data = await res.json();
    return data;
  }
}

customElements.define('chat-interface', ChatInterface);