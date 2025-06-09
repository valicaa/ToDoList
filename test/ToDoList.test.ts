import { ethers } from "hardhat";
import { expect } from "chai";
import { ToDoList } from "../typechain-types";

describe("ToDoList Contract", () => {
    let ToDoList: ToDoList;
    let owner: any;

    beforeEach(async () => {
        [owner] = await ethers.getSigners();
        const ToDoListFactory = await ethers.getContractFactory("ToDoList", owner);
        ToDoList = await ToDoListFactory.deploy() as ToDoList;
        await ToDoList.waitForDeployment();
    });

    it("Should create a new todo", async()=>{
        const name = "Test Todo";
        const description = "This is a test todo";
        const deadline = Math.floor(Date.now() / 1000) + 3600;
        const createTx = await ToDoList.createTodo(name, description, deadline);
        await createTx.wait();
        const todos = await ToDoList.getToDos();
        expect(todos.length).to.equal(1);
        expect(todos[0].name).to.equal(name);
        expect(todos[0].description).to.equal(description);
        expect(todos[0].deadline).to.equal(deadline);
        expect(todos[0].completed).to.equal(false);
    });

    it("Should get all todos", async() => {
        const name = "Test Todo";
        const description = "This is a test todo";
        const deadline = Math.floor(Date.now() / 1000) + 3600;
        const createTx = await ToDoList.createTodo(name, description, deadline);
        await createTx.wait();

        const name2 = "Test Todo";
        const description2 = "This is a test todo";
        const deadline2 = Math.floor(Date.now() / 1000) + 3600;
        const createTx2 = await ToDoList.createTodo(name2, description2, deadline2);
        await createTx.wait();
        const todos = await ToDoList.getToDos();
        expect(todos.length).to.equal(2);
        expect(todos[0].name).to.equal(name);
        expect(todos[0].description).to.equal(description);
        expect(todos[0].deadline).to.equal(deadline);
        expect(todos[0].completed).to.equal(false);
        expect(todos[1].name).to.equal(name2);
        expect(todos[1].description).to.equal(description2);
        expect(todos[1].deadline).to.equal(deadline2);
        expect(todos[1].completed).to.equal(false);
    });

    it("Should toggle the completed status of a todo", async() => {
        const name = "Test Todo";
        const description = "This is a test todo";
        const deadline = Math.floor(Date.now() / 1000) + 3600;
        const createTx = await ToDoList.createTodo(name, description, deadline);
        await createTx.wait();

        const toggleTx = await ToDoList.toggleCompleted(0);
        await toggleTx.wait();
        const todos = await ToDoList.getToDos();
        expect(todos[0].completed).to.equal(true);

        const toggleTx2 = await ToDoList.toggleCompleted(0);
        await toggleTx2.wait();
        const todos2 = await ToDoList.getToDos();
        expect(todos2[0].completed).to.equal(false);
    });

    // it("Should get the balance 0 initially after deployment", async () => {
    //     const currentBalance = await ToDoList.balances(owner.address);
    //     expect(currentBalance).to.equal(0);
    // })

    // it("should deposit funds and update balance", async () => {
    //     const depositAmount = ethers.parseEther("100");
    //     await ToDoList.deposit({value: depositAmount});
    //     const currentBalance = await ToDoList.balances(owner.address);
    //     expect(currentBalance).to.equal(depositAmount);
    // })

    // it("should allow a user to withdraw their funds", async () => {
    //     const depositAmount = ethers.parseEther("100");
    //     await ToDoList.deposit({ value: depositAmount });
    
    //     const withdrawAmount = ethers.parseEther("50");
    
    //     // Get the owner's balance BEFORE the withdrawal
    //     const balanceBefore = await ethers.provider.getBalance(owner.address);
    
    //     // Perform the withdrawal and wait for the transaction receipt
    //     const withdrawTx = await ToDoList.withdraw(withdrawAmount);
    //     const receipt = await withdrawTx.wait();
    
    //     // Calculate the gas cost of the withdrawal transaction
    //     const gasCost = receipt.gasUsed * receipt.gasPrice;
    
    //     // Get the owner's balance AFTER the withdrawal
    //     const balanceAfter = await ethers.provider.getBalance(owner.address);
    
    //     // ASSERTION 1: Check the contract's internal balance for the owner
    //     const contractBalance = await ToDoList.balances(owner.address);
    //     expect(contractBalance).to.equal(ethers.parseEther("50")); // 100 - 50
    
    //     // ASSERTION 2: Check the owner's external wallet balance
    //     // It should be the starting balance, plus the 50 ETH they withdrew, minus the gas cost.
    //     expect(balanceAfter).to.equal(balanceBefore + withdrawAmount - gasCost);
    // });

    // it("should failed to withdraw more than the balance", async () => {
    //     const depositAmount = ethers.parseEther("100");
    //     const depositTx = await ToDoList.deposit({value: depositAmount});
    //     await depositTx.wait();

    //     const withdrawAmount = ethers.parseEther("150");
    //     await expect(ToDoList.withdraw(withdrawAmount)).to.be.revertedWith("Insufficient Balance");
    // })
})