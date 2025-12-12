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
        <section className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Сталася помилка в інтерфейсі</h2>
          <p className="opacity-80 mb-4">
            Сторінка не змогла відобразитися. Спробуйте оновити або повернутися назад.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="border px-4 py-2 rounded"
            >
              Оновити сторінку
            </button>

            <button
              type="button"
              onClick={this.handleReset}
              className="border px-4 py-2 rounded"
            >
              Спробувати ще раз
            </button>
          </div>

          {/* Якщо хочеш — можна показувати короткий текст помилки в dev-режимі */}
          {/* <pre className="mt-4 text-left text-xs opacity-70 overflow-auto">
            {String(this.state.error)}
          </pre> */}
        </section>
      );
    }

    return this.props.children;
  }
}
