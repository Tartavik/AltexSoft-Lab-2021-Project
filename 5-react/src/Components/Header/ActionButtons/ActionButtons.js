
function ActionButtons(props) {

    function whatIsButton(e) {
        props.clickButton(e.currentTarget.name)
    }

    return (
        <div>
            <button name='Home' onClick={whatIsButton}>Home</button>
            <button name='LogIn' onClick={whatIsButton}>Log in</button>
            <button name='SingUp' onClick={whatIsButton}>Sing up</button>
        </div>
    );
}

export default ActionButtons;