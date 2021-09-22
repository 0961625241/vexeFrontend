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
    const isDisplayIcon =()=>{
        setIconChat(!iconChat)
    }
    const buttonSend =(event)=>{
      event.preventDefault();
      props.buttonSend(document.getElementById(`${props.conversation}inputMessage`),props.conversation);
      setValueInputChat('')
    }

    const cancelTyping=()=>{
      props.socket.emit("clienSendTyping", {username:props.inforUser.name,conversation:props.itemOne.conversation,showTyping:false}); 
  }
    const enterKey=(e)=> {
      let timeoutObj ;
      clearTimeout(timeoutObj);
      timeoutObj=setTimeout(cancelTyping,3000)
      props.socket.emit("clienSendTyping", {username:props.inforUser.name,conversation:props.itemOne.conversation,showTyping:true}); 
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
    </div>: ''}
    <div id={`bottom_wrapper${props.itemOne.conversation.replace("@gmail.com", "")}`} style={{display:'flex'}}>
                  <div className="">
                  {/* onKeyUp={(e) => this.enterKey(e)} */}
                  {/* ref="message" */}
                      <input onKeyUp={(e) => enterKey(e)} onChange={onChangeInputChat} id={`${props.conversation}inputMessage`}  value={valueInputChat} name="valueInputCha" className="inputMessageClass" autoComplete="off" placeholder="Viết phản hồi..."  />
                  </div>
                  <div className="buttonIconChat" onClick={isDisplayIcon}><i className="far fa-smile"></i></div>
                  <div className="buttonSendChat" >
                  {/* <i class="far fa-smile"></i> */}
                  {/* <i class="fas fa-paper-plane"></i> */}
                      <div onClick={buttonSend} className="" id="Send" >Send</div>
                  </div>
              </div>
              </>
  );
};

export default Input1;