import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Page Error caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <h2>Сталася помилка в інтерфейсі</h2>
          <p>Сторінка не змогла відобразитися. Спробуйте оновити або повернутися назад.</p>
          <div>
            <button type="button" onClick={() => window.location.reload()}>Оновити сторінку</button>
            <button type="button" onClick={this.handleReset}>Спробувати ще раз </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
