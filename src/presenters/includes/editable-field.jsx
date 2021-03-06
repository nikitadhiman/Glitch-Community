import React from 'react';
import PropTypes from 'prop-types';
import {debounce, uniqueId} from 'lodash';

export default class EditableField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      error: "",
    };
    this.textInput = React.createRef();
    
    this.onChange = this.onChange.bind(this);
    this.update = debounce(this.update.bind(this), 500);
  }
  
  componentDidMount() {
    if (this.props.autoFocus) {
      this.textInput.current.select();
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.submitError !== this.props.submitError) {
      this.setState({
        error: this.props.submitError
      });
      // focus the field if an error has been created
      if (this.props.submitError.length) {
        this.textInput.current.select();
      }
    }
  }

  update(value){
    this.props.update(value).then(
      this.handleSuccess.bind(this),
      this.handleFailure.bind(this, value));
  }
  
  handleSuccess() {
    this.setState({error: ""});
  }
  
  handleFailure(data, message) {
    // The update failed; we can ignore this if our state has already moved on
    console.log('data', data, message);
    if(data !== this.state.value.trim()){
      return;
    }

    // Ah, we haven't moved on, and we know the last edit failed.
    // Ok, display an error.
    this.setState({error: message || ""});
  }

  onChange(evt) {
    let value = evt.currentTarget.value;
    this.setState((lastState) => {
      if(lastState.value.trim() !== value.trim()) {
        this.update(value.trim());
      }
      return {value};
    });
  }
  render() {
    const classes = ["content-editable", this.state.error ? "error" : ""].join(" ");
    const inputProps = {
      className: classes,
      value: this.state.value,
      onChange: this.onChange,
      spellCheck: false,
      autoComplete: "off",
      placeholder: this.props.placeholder,
      id: uniqueId("editable-field-"),
      autoFocus: this.props.autoFocus,
    };
    
    const maybeErrorIcon = !!this.state.error && (
      <span className="editable-field-error-icon" role="img" aria-label="Warning">🚒</span>
    );
    
    const maybeErrorMessage = !!this.state.error && (
      <div className="editable-field-error-message">
        {this.state.error}
      </div>
    );
    
    const maybePrefix = !!this.props.prefix && (
      <span className={"content-editable-prefix " + classes}>{this.props.prefix}</span>
    );
    
    return (
      <label htmlFor={inputProps.id}>
        <div className="editable-field-flex">
          {maybePrefix}
          <input {...inputProps} ref={this.textInput} />
          {maybeErrorIcon}
        </div>
        {maybeErrorMessage}
      </label>
    );
  }
}
EditableField.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  autoFocus: PropTypes.bool,
  submitError: PropTypes.string,
};
