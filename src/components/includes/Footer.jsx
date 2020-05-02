import React, { Component } from 'react'

export class Footer extends Component {
    render() {        
        return (
            <div>
                <p style={{ textAlign:'center' }}>&copy;2020 - e-commerce</p>
            </div>
        )
    }
}

// (function(){
//     window.scroll(function(){
//         let vscroll = this.scrollTop();
//         console.log(vscroll);
//     });
// })();
export default Footer
