import { Component } from 'react';

export class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Regression projection Canvas error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="regression-canvas-wrap regression-webgl-fallback">
          <span>3D visualisation unavailable</span>
        </div>
      );
    }
    return this.props.children;
  }
}
