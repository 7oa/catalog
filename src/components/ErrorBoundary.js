import React from "react";
import "../css/error-boundary.scss";

class ErrorBoundary extends React.Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.error) {
      // Error path
      return (
        <div className="error-boundary">
          <h2 className="error-boundary__title">Что-то пошло не так.</h2>
          <details
            className="error-boundary__details"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <summary>Подробнее</summary>
            <p>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </p>
          </details>
          <button
            className="error-boundary__button"
            onClick={() => {
              window.location.reload();
            }}
          >
            Обновить страницу
          </button>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
