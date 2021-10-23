/*
File: script.js
GUI Assignment: Homework 3 - Creating an Interactive Dynamic Table
Michael McGilvray, michael_mcgilvray@student.uml.edu
Copyright (c) 2021 by Michael McGilvray. All rights reserved. May be freely 
copied or excerpted for educational purposes with credit to the author.
Updated by MM on October 23, 2021 at 1:00PM

This file serves as the behavior layer of the multiplication table generator.
It adds the functionality to the dynamic table generation by getting and 
validating the inputs from the user to then create HTML elements that make up
the multiplication table. When any input field is changed, the input is 
validated and if it is invalid, an appropriate error message is displayed.
*/

// Get important elements by ID
const minColID = document.getElementById("minCol");
const maxColID = document.getElementById("maxCol");
const minRowID = document.getElementById("minRow");
const maxRowID = document.getElementById("maxRow");
const submitID = document.getElementById("submit");
const tableID = document.getElementById("multiplicationTable");

// Add an event listener to the submit button
if (submitID) {
    submitID.addEventListener("click", function(){
        // Create an error if the user clicks generate table before inputting
        // all values.
        if (minColID.value.length == 0 || maxColID.value.length == 0 ||
            minRowID.value.length == 0 || maxRowID.value.length == 0) {
            createErrorMessage("All inputs must have an integer value.");
        } else {
            removeErrorMessage("All inputs must have an integer value.");
        }

        validateInput();
        
        // Only generate the table if there are no errors
        if (document.getElementsByClassName("invalidInput").length == 0) {
            generateTable();
        }
    });
}

// Add event listeners to all of the input fields
if (minColID || maxColID || minRowID || maxRowID) {
    minColID.addEventListener("change", function() {
        // Check if minimum column value is empty
        if (minColID.value.length == 0) {
            createErrorMessage("Minimum Column Value is empty.");
        } else {
            removeErrorMessage("Minimum Column Value is empty.");
        }
        validateInput();
    });

    maxColID.addEventListener("change", function() {
        // Check if maximum value is empty
        if (maxColID.value.length == 0) {
            createErrorMessage("Maximum Column Value is empty.");
        } else {
            removeErrorMessage("Maximum Column Value is empty.");
        }
        validateInput();
    });

    minRowID.addEventListener("change", function() {
        // Check if minimum row value is empty
        if (minRowID.value.length == 0) {
            createErrorMessage("Minimum Row Value is empty.");
        } else {
            removeErrorMessage("Minimum Row Value is empty.");
        }
        validateInput();
    });

    maxRowID.addEventListener("change", function() {
        // Check if row value is empty
        if (maxRowID.value.length == 0) {
            createErrorMessage("Maximum Row Value is empty.");
        } else {
            removeErrorMessage("Maximum Row Value is empty.");
        }
        validateInput();
    });
}

// This function assumes the inputs have already been validated and will create
// all of the HTML elements inside the table based on the 4 inputs
function generateTable() {
    // Clear the contents of the table
    tableID.innerHTML = "";

    const numberOfColumns = (maxColID.value - minColID.value) + 2;
    const numberOfRows = (maxRowID.value - minRowID.value) + 2;

    // Create a row, add the th and td elements, then add the row to the table
    for (var i = 0; i < numberOfRows; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < numberOfColumns; j++) {
            // Create a th when its the first row or first column
            if (i == 0 || j == 0) {
                var cell = document.createElement("th");   
            } else {
                var cell = document.createElement("td");
            }

            // parseInt converts string to integer
            const currentRow = parseInt(minColID.value) + j - 1;
            const currentCol = parseInt(minRowID.value) + i - 1;
            
            // First row and collumn (should be blank)
            if (i == 0 && j == 0) {
                cell.innerHTML = "";
            } 
            // First row
            else if (i == 0) {
                cell.innerHTML = currentRow;
            } 
            // First column
            else if (j == 0) {
                cell.innerHTML = currentCol;
            } 
            // The data cells (where the multiplication occurs)
            else {
                cell.innerHTML = currentRow * currentCol;
            }
            row.appendChild(cell);
        }
        tableID.appendChild(row);
    }
};

// This function does most of the error checking and will create and diaplay an
// error message when the input is invalid.
// Function checks: if input is an integer (not a letter or float), if the input
// is not too big or too small (above -50 and below 50), and if the min > max.
function validateInput() {
    // Ensure minimum column input is valid
    if (!(Number.isInteger(Number(minColID.value)))) {
        // Floating point numbers
        if (isAFloatingPointNumber(minColID.value)) {
            createErrorMessage("Minimum column value can't be a decimal value. It must be a whole number.");
        } else {
            removeErrorMessage("Minimum column value can't be a decimal value. It must be a whole number.");
        }

        // Non-floating point numbers
        if (!isAFloatingPointNumber(minColID.value)) {
            createErrorMessage("Minimum column value must be an integer.");
        } else {
            removeErrorMessage("Minimum column value must be an integer.");
        }
    } else {
        removeErrorMessage("Minimum column value can't be a decimal value. It must be a whole number.");
        removeErrorMessage("Minimum column value must be an integer.");
    }

    // Ensure maximum column input is valid
    if (!(Number.isInteger(Number(maxColID.value)))) {
        // Floating point numbers
        if (isAFloatingPointNumber(maxColID.value)) {
            createErrorMessage("Maximum column value can't be a decimal value. It must be a whole number.");
        } else {
            removeErrorMessage("Maximum column value can't be a decimal value. It must be a whole number.");
        }

        // Non-floating point numbers
        if (!isAFloatingPointNumber(maxColID.value)) {
            createErrorMessage("Maximum column value must be an integer.");
        } else {
            removeErrorMessage("Maximum column value must be an integer.");
        }
    } else {
        removeErrorMessage("Maximum column value can't be a decimal value. It must be a whole number.");
        removeErrorMessage("Maximum column value must be an integer.");
    }

    // Ensure minimum row input is valid
    if (!(Number.isInteger(Number(minRowID.value)))) {
        // Floating point numbers
        if (isAFloatingPointNumber(minRowID.value)) {
            createErrorMessage("Minimum row value can't be a decimal value. It must be a whole number.");
        } else {
            removeErrorMessage("Minimum row value can't be a decimal value. It must be a whole number.");
        }

        // Non-floating point numbers
        if (!isAFloatingPointNumber(minRowID.value)) {
            createErrorMessage("Minimum row value must be an integer.");
        } else {
            removeErrorMessage("Minimum row value must be an integer.");
        }
    } else {
        removeErrorMessage("Minimum row value can't be a decimal value. It must be a whole number.");
        removeErrorMessage("Minimum row value must be an integer.");
    }

    // Ensure maximum row input is valid
    if (!(Number.isInteger(Number(maxRowID.value)))) {
        // Floating point numbers
        if (isAFloatingPointNumber(maxRowID.value)) {
            createErrorMessage("Maximum row value can't be a decimal value. It must be a whole number.");
        } else {
            removeErrorMessage("Maximum row value can't be a decimal value. It must be a whole number.");
        }

        // Non-floating point numbers
        if (!isAFloatingPointNumber(maxRowID.value)) {
            createErrorMessage("Maximum row value must be an integer.");
        } else {
            removeErrorMessage("Maximum row value must be an integer.");
        }
    } else {
        removeErrorMessage("Maximum row value can't be a decimal value. It must be a whole number.");
        removeErrorMessage("Maximum row value must be an integer.");
    }

    // Ensure inputs are between -50 and 50
    const minAccepted = -50;
    const maxAccepted = 50;

    if (minColID.value < minAccepted || minColID.value > maxAccepted ||
        maxColID.value < minAccepted || maxColID.value > maxAccepted ||
        minRowID.value < minAccepted || minRowID.value > maxAccepted ||
        maxRowID.value < minAccepted || maxRowID.value > maxAccepted) {
        createErrorMessage("All inputs must be between " + minAccepted + " and " + maxAccepted + ".");
    } else {
        removeErrorMessage("All inputs must be between " + minAccepted + " and " + maxAccepted + ".");
    }

    // Ensure min < max
    if ((Number(minColID.value) > Number(maxColID.value)) && (minColID.value.length != 0)
        && (maxColID.value.length != 0)) {
        createErrorMessage("Minimum column value must be less than or equal to maximum column value.");
    } else {
        removeErrorMessage("Minimum column value must be less than or equal to maximum column value.");
    }
    if ((Number(minRowID.value) > Number(maxRowID.value)) && (minRowID.value.length != 0)
        && (maxRowID.value.length != 0)) {
        createErrorMessage("Minimum row value must be less than or equal to maximum row value.");
    } else {
        removeErrorMessage("Minimum row value must be less than or equal to maximum row value.");
    }
}

function isAFloatingPointNumber(x) {
    return (x % 1 != 0) && (Number(x) == x);
}

function createErrorMessage(message) {
    // Create an error message only if there isn't one that exists with the same
    // message
    var existingErrors = document.getElementsByClassName("invalidInput");
    for (var i = 0; i < existingErrors.length; i++) {
        if (existingErrors[i].innerHTML == message) {
            return;
        }
    }

    // Create a new error
    errorTag = document.createElement("p")
    errorTag.setAttribute("class", "invalidInput");
    errorTag.innerHTML = message;

    // Insert error after the generate table button
    submitID.parentNode.insertBefore(errorTag, submitID.nextSibling);
}

function removeErrorMessage(message) {
    // Remove only the error with the given message and leave the other errors
    // if there are any
    errorTag = document.getElementsByClassName("invalidInput");
    if (errorTag.length != 0) {
        for (var i = 0; i < errorTag.length; i++) {
            if (errorTag[i].innerHTML == message) {
                errorTag[i].remove();
            }
        }
    }
}