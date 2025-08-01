# TalkFlow - Voice-to-Visual Meeting Translator

Transform your voice into dynamic diagrams, mind maps, and flowcharts in real-time. TalkFlow is the perfect tool for visual thinkers, brainstorming sessions, and collaborative meetings.

![TalkFlow Logo](public/favicon.svg)

## 🎯 What Problem Does TalkFlow Solve?

Many people think visually but struggle to capture their ideas quickly during meetings or brainstorming sessions. Traditional note-taking is slow and doesn't capture the visual connections between ideas. TalkFlow solves this by:

- **Converting speech to visual diagrams instantly** - No more typing or drawing by hand
- **Creating professional diagrams automatically** - Mind maps, flowcharts, and outlines from natural speech
- **Enabling real-time collaboration** - See ideas transform into visuals as you speak
- **Making meetings more productive** - Focus on ideas, not note-taking

## ✨ Key Features

### 🎤 Real-Time Speech Recognition
- Advanced speech-to-text conversion with high accuracy
- Works in multiple languages
- No special commands needed - just speak naturally

### 🧠 Smart Visual Generation
- **Mind Maps**: Radial layouts that show idea connections
- **Flowcharts**: Professional process diagrams with decision points
- **Outlines**: Structured hierarchical lists

### 🎨 Interactive Diagrams
- **Drag and drop** nodes to reorganize ideas
- **Resize nodes** to fit content
- **Edit text** by double-clicking any node
- **Zoom and pan** for large diagrams

### 💾 Session Management
- **Auto-save** to browser storage
- **Session persistence** across browser sessions
- **New session** button to start fresh
- **Export capabilities** (coming soon)

### 📱 Responsive Design
- Works perfectly on desktop, tablet, and mobile
- Touch-friendly interface on mobile devices
- Adaptive layouts for different screen sizes

## 🚀 How to Use TalkFlow

### Getting Started

1. **Visit the App**: Open TalkFlow in your web browser
2. **Start a Session**: Click "Start Visualizing" on the landing page
3. **Allow Microphone Access**: Grant permission when prompted

### Recording Your Ideas

1. **Click the Microphone Button**: The large circular button in the center
2. **Start Speaking**: Talk naturally about your ideas, project, or meeting topic
3. **Watch the Magic**: See your words transform into visual diagrams in real-time
4. **Stop Recording**: Click the microphone button again when finished

### Managing Your Diagrams

#### Switching View Modes
- **Mind Map**: Best for brainstorming and idea exploration
- **Flowchart**: Perfect for processes, workflows, and decision trees
- **Outline**: Ideal for structured lists and hierarchical information

#### Interacting with Nodes
- **Select a node**: Click on any diagram element
- **Move nodes**: Drag them to new positions
- **Resize nodes**: Use the blue handle on selected nodes
- **Edit text**: Double-click any node to modify the content
- **Zoom**: Use the zoom controls in the top-right corner

#### Session Management
- **Auto-save**: Your work is automatically saved as you speak
- **New session**: Click "New Session" to start fresh
- **View saved lines**: See how many ideas you've captured

### Mobile Usage

On mobile devices:
- The microphone button appears as a floating action button
- Use the mobile drawer to access controls and transcript
- Touch gestures work for zooming and panning

## 🛠️ Technologies Used

### Frontend Framework
- **Next.js 15** - React framework for production
- **TypeScript** - Type-safe JavaScript development
- **React 18** - Modern React with hooks and functional components

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Modern icon library

### Speech Recognition
- **Web Speech API** - Built-in browser speech recognition
- **Real-time processing** - Instant voice-to-text conversion

### State Management
- **React Hooks** - useState, useEffect, useCallback
- **Custom hooks** - useTranscript, useMobile
- **Local Storage** - Session persistence

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm package manager
- Modern web browser with microphone support

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/talkflow.git
   cd talkflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

![screenshot](/public/screenshot/screencapture-localhost-3000-2025-08-01-23_25_14.png)
Landing page

![screenshot](/public/screenshot/screencapture-localhost-3000-meeting-2025-08-01-23_25_28.png)
App interface before voice recording 

![screenshot](/public/screenshot/screencapture-localhost-3000-meeting-2025-08-01-23_26_50.png)
App interface


## 🌟 Features in Detail

### Voice Recognition
- **Continuous listening** - No need to press and hold
- **Interim results** - See words as you speak them
- **Final results** - Complete sentences added to diagrams
- **Error handling** - Graceful fallbacks for recognition issues

### Diagram Types

#### Mind Maps
- **Radial layout** - Central idea with connected concepts
- **Automatic positioning** - Smart placement of related ideas
- **Visual connections** - Lines showing relationships between concepts

#### Flowcharts
- **Process flow** - Sequential steps and decision points
- **Professional styling** - Different shapes for different node types
- **Directional arrows** - Clear flow direction
- **Decision diamonds** - Automatic detection of decision points

#### Outlines
- **Hierarchical structure** - Main points and sub-points
- **Clean layout** - Easy-to-read list format
- **Indentation** - Visual hierarchy

### Interactive Features
- **Real-time updates** - Diagrams update as you speak
- **Node selection** - Click to select and modify nodes
- **Drag and drop** - Reposition ideas easily
- **Text editing** - Modify content inline
- **Canvas navigation** - Zoom, pan, and explore large diagrams

## 🔧 Browser Compatibility

TalkFlow works best in modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Note**: Speech recognition requires HTTPS in production or localhost for development.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Web Speech API** - For enabling voice recognition
- **shadcn/ui** - For beautiful UI components
- **Framer Motion** - For smooth animations
- **Tailwind CSS** - For utility-first styling

## 📞 Support

If you have questions or need help:
- **Issues**: Create an issue on GitHub
- **Documentation**: Check this README and code comments
- **Community**: Join our discussions

---

**Made with ❤️ for visual thinkers everywhere** 