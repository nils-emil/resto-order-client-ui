import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import callToast from '../../services/callToast'

import {withRouter} from 'react-router-dom'
import './styles.scss'

function CallServiceChoice(props) {

    const callPressed = (message, type) => {
        props.callWaiter(() => callToast(message, 5000), type)
        props.handleClose()
    }

    return (
        <React.Fragment>
            <Dialog fullWidth={true}
                    open={props.open}
                    onClose={props.handleClose}
                    aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title">Telli teenindust</DialogTitle>
                <DialogContent>
                    <div className={'order-choice-container'}>
                        <div className={'order-choice'} >
                            <img onClick={() => {callPressed("Teenindaja toob makseterminali esimesel võimalusel", "PAYMENT")}}
                                 className={'order-choice-svg'} src="undraw_Credit_card_3ed6.svg" alt="Credit card"/>
                                 <p onClick={() => {callPressed("Teenindaja toob makseterminali esimesel võimalusel", "PAYMENT")}}
                                    className={'order-choice-text'}>Soovin maksta</p>
                        </div>
                        <div className={'order-choice'}>
                            <img  onClick={() => {callPressed("Teenindaja teenindab teid esimesel võimalusel", "SERVICE")}}
                                  className={'order-choice-svg'} src="undraw_eating_together_tjhx.svg" alt="Order service"/>
                            <p onClick={() => {callPressed("Teenindaja teenindab teid esimesel võimalusel", "SERVICE")}}
                               className={'order-choice-text'}>Soovin teenindust</p>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Tühista
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default withRouter(CallServiceChoice)
