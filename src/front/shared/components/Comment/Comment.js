import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import moment from 'moment-with-locales-es6'
import styles from './Comment.scss'
import { defineMessages, injectIntl } from 'react-intl'


const labels = defineMessages({
  Text: {
    id: 'Comment_1',
    defaultMessage: 'Add notice',
  }
})
@injectIntl

@CSSModules(styles, { allowMultiple: true })

export default class CommentRow extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    commentKey: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props)
    this.commentTextarea = React.createRef()
    this.state = {
      isOpen: props.isOpen,
      comment: null
    }
  }

  submitComment = (e, props) => {

    if (e) {
      e.preventDefault()
    }
    const {
      commentKey
    } = this.props

    const {
      comment
    } = this.state


    actions.comments.setComment({
      key:commentKey,
      comment:comment
    })
    //actions.comments.returnDefaultComment(obj)

    this.toggleComment(false)
  }
  componentDidMount(prevState, ) {

    const {
      commentKey
    } = this.props

    // not need anymore
    // actions.core.getSwapHistory()
    const comment = actions.comments.getComment(commentKey)

    if(comment) {
      this.setState({
        comment
      })
    }

  }
  componentDidUpdate(prevProps) {

    if (this.props.isOpen && this.props.isOpen !== prevProps.isOpen && this.props.onSubmit) {
      this.handleKeyUp();
    }
  }

  handleKeyUp = (e = null) => {
    if (!this.commentTextarea) {

      return
    }

    if (e && e.ctrlKey && e.keyCode == 13) {

      this.submitComment(null, this.props)
      return
    }

    this.commentTextarea
      .current.style.cssText = 'height:' + this.commentTextarea.current.scrollHeight + 'px;'
  }

  changeComment = (event) => this.setState({comment: event.target.value});

  toggleComment = () => {
    const {isOpen = false} = this.state
    this.setState({isOpen: !isOpen})
  }

  render() {
    const {
      label,
      intl,
      date,
      canEdit = false,
      showComment = false
      } = this.props

    const { isOpen = false, comment = null } = this.state

    return (
      <div styleName="wrap-block">
        {canEdit && (isOpen ?
          <form styleName="input" onSubmit={(e) => this.submitComment(e, this.props)}>
            <textarea ref={this.commentTextarea}
                      styleName="commentTextarea" id="commentTextarea"
                      onKeyUp={this.handleKeyUp}
                      onChange={this.changeComment}
                      value={comment} ></textarea>
            <span styleName="submit" onClick={(e) => this.submitComment(e, this.props)}>&#10004;</span>
            <span styleName="close" onClick={() => this.toggleComment()}>&times;</span>
          </form> :
          <div styleName="add-link" onClick={() => this.toggleComment(true)}>
            {intl.formatMessage(labels.Text)}
          </div>)}
        {showComment && (
          <div styleName="date" onDoubleClick={() => canEdit ? toggleComment(true) : false}>
            {date && (<div>{moment(date).format('LLLL')}</div>) }
            {comment && (<div>{comment}</div>)}
          </div>
        )}
    </div>)
  }
}
