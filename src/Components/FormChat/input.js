import React, { useState } from 'react';

import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
const Input1 = (props) => {
  const [iconChat, setIconChat] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [valueInputChat, setValueInputChat] = useState('');
  const onEmojiClick = (event, emojiObject) => {
    setValueInputChat(valueInputChat + emojiObject.emoji);
    setChosenEmoji(emojiObject);
    setIconChat(false)
  };
  const onChangeInputChat = event => {
    console.log(event.target.value)
    setValueInputChat(event.target.value);
  };
  const isDisplayIcon = () => {
    setIconChat(!iconChat)
  }
  const buttonSend = (event) => {
    event.preventDefault();
    props.buttonSend(document.getElementById("inputMessage"));
    setValueInputChat('')

  }
  
  const cancelTyping=()=>{
    props.socket.emit("clienSendTyping", {username:props.inforUser.name,conversation:props.inforUser.conversation ,showTyping:false}); 
}
  const enterKey=(e)=> {
    let timeoutObj ;
    clearTimeout(timeoutObj);
    timeoutObj=setTimeout(cancelTyping,3000)
    props.socket.emit("clienSendTyping", {username:props.inforUser.name,conversation:props.inforUser.conversation,showTyping:true}); 
}
  return (
    <>

      {iconChat === true ?
        <div className="iconChat">
          <Picker
            disableSearchBar={true}
            groupVisibility={{
              flags: false,
            }}
            onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }} skinTone={SKIN_TONE_MEDIUM_DARK} />
        </div> : ''}

      <div id={`bottom_wrapper${props.inforUser.conversation.replace("@gmail.com", "")}`} style={{ display: 'flex' }}>
        <div className="">
       
          {/* ref="message" */}
          <input onKeyUp={(e) => enterKey(e)} onChange={onChangeInputChat} id="inputMessage" value={valueInputChat} name="valueInputChat" autoComplete="off" className="inputMessageClass" placeholder="Viết phản hồi..." />
        </div>
        <div className="buttonIconChat" onClick={isDisplayIcon}><i className="far fa-smile"></i></div>
        <div className="buttonSendChat" >
          {/* <i class="far fa-smile"></i> */}
          {/* <i class="fas fa-paper-plane"></i> */}
          <div onClick={buttonSend} className="SendBtn" id="Send" >Send</div>
        </div>
      </div>
    </>
  );
};

export default Input1;