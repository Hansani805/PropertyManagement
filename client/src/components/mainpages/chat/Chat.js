import {GlobalState} from '../../../GlobalState'
import axios from 'axios';
import './chat.css';

function Chat(){

    return(
        
    <div className="Chat">
      <div class="screen">
    <div className="chatb">
	<div class="conversation">
		<div class="messages messages--received">
			<div class="message">Hi Ms.Nirosha wijewardane</div>
			<div class="message">Is this room now available?</div>
      <div class="message">Or not?</div>
		</div>
		<div class="messages messages--sent">
			<div class="message">Yes it's available </div>
			<div class="message">You can book now</div>
		
		</div>
		<div class="messages messages--received">
			<div class="message">Sure!</div>
		</div>
	</div>
	<div class="text-bar">
		<form class="text-bar__field" id="form-message">
			<input type="text" placeholder="Type your message here "/>
		</form>
		<div class="text-bar__thumb">
			<div class="thumb"></div>
		</div>

	</div>
    </div>
</div>
    </div>
    

    


    );
}

export default Chat