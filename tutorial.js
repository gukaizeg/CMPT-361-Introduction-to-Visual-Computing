// TODO: Import something from the module.

/*
    JavaScript Basics
*/

function mySetupFunc() {

    // TODO: Log message to the box

    // TODO: Logging a message to the console

    // TODO: Creating an object

    // TODO: Creating a class
    
}

window.myInitFunction = mySetupFunc;

// TODO: Working with arrays (Console)

// TODO: Working with maps (Console)


/*
    Buttons
*/

// TODO: React to button events


/*
    Text Input
*/

// TODO: Read the value of a text box when it changes


/*
    Menus
*/


// TODO: Respond to menu selection


// TODO: Respond to radio button selection


/*
    Sliders
*/

// TODO: Read slider value



/*
    Color Picker
*/

// TODO: Change the background color using the picker

/*
    Input Events
*/

// TODO: Process input events and update values in box


/*
    Timers
*/

// TODO: Use set interval to update a string 

// Logging

function logMessage(message) {
    document.getElementById("messageBox").innerText += `[msg]: ${message}\n\n`;
}

function logObject(obj) {
    let message = JSON.stringify(obj, null, 2);
    document.getElementById("messageBox").innerText += `[obj]:\n${message}\n\n`;
}