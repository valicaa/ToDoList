// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ToDoList {

    // The blueprint for a single todo item
    struct ToDo {
        uint id;
        string name;
        string description;
        uint deadline;
        bool completed;
        bool deleted;
    }

    // The lookup table to get the list of todos for each user
    mapping(address => ToDo[]) public todoLists;

    // Function to create a new todo
    function createTodo(string memory _name, string memory _description, uint _deadline) public {
        todoLists[msg.sender].push(ToDo(
            todoLists[msg.sender].length,
            _name,
            _description,
            _deadline,
            false,
            false
        ));
    }

    // Function to get all todos for a user
    function getTodos(address _user) public view returns (ToDo[] memory) {
        return todoLists[_user];
    }

    // Function to mark a specific todo as completed
    function toggleCompleted(uint _id) public {
        todoLists[msg.sender][_id].completed = true;
    }

    function deleteToDo(uint _id) public {
        todoLists[msg.sender][_id].deleted = true;
    }
}