
/* =========================================================
   SANAULLAH AI WORKOS
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENT REFERENCES
========================================================= */

const pageTitle =
    document.getElementById("pageTitle");

const sidebar =
    document.getElementById("sidebar");

const toast =
    document.getElementById("toast");

const commandInput =
    document.getElementById("commandInput");

const commandResult =
    document.getElementById("commandResult");

const menuBtn =
    document.getElementById("menuBtn");

const runCommand =
    document.getElementById("runCommand");

const startTask =
    document.getElementById("startTask");

const notificationBtn =
    document.getElementById("notificationBtn");

const activityBtn =
    document.getElementById("activityBtn");


/* =========================================================
   PAGE DEFINITIONS
========================================================= */

const pages = {

    dashboard:
        "Dashboard",

    assistant:
        "AI Assistant",

    tasks:
        "My Tasks",

    projects:
        "Projects",

    coding:
        "Coding Agent",

    web:
        "Web Agent",

    data:
        "Excel & Data Agent",

    automation:
        "Automation Agent",

    seo:
        "SEO Intelligence",

    chatbot:
        "AI Chatbot Builder",

    research:
        "Research Agent",

    visual:
        "Visual Task Agent",

    memory:
        "AI Memory",

    approvals:
        "Approvals",

    proof:
        "Proof & Demo",

    settings:
        "Settings"

};


/* =========================================================
   APPLICATION STATE
========================================================= */

const AppState = {

    currentPage:
        "dashboard",

    sidebarOpen:
        false,

    commandHistory:
        []

};


/* =========================================================
   TOAST FUNCTION
========================================================= */

let toastTimer = null;


function showToast(message) {

    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2600);

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function setPage(page) {

    if (!pages[page]) {

        page =
            "dashboard";

    }


    AppState.currentPage =
        page;


    pageTitle.textContent =
        pages[page];


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        });


    /*
       At this stage this is a frontend shell.
       Real page modules will be connected later.
    */

    if (page !== "dashboard") {

        showToast(
            `${pages[page]} selected — module ready for integration.`
        );

    }


    closeSidebar();

}


/* =========================================================
   NAVIGATION EVENT LISTENERS
========================================================= */

document
    .querySelectorAll("[data-page]")
    .forEach(element => {

        element.addEventListener(
            "click",
            () => {

                setPage(
                    element.dataset.page
                );

            }
        );

    });


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function openSidebar() {

    sidebar.classList.add(
        "open"
    );

    AppState.sidebarOpen =
        true;

}


function closeSidebar() {

    sidebar.classList.remove(
        "open"
    );

    AppState.sidebarOpen =
        false;

}


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        () => {

            if (
                AppState.sidebarOpen
            ) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );

}


/* =========================================================
   QUICK COMMANDS
========================================================= */

document
    .querySelectorAll(".quick button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const command =
                    button.dataset.command || "";

                commandInput.value =
                    command;


                commandInput.focus();

                showToast(
                    "Quick command added."
                );

            }
        );

    });


/* =========================================================
   START AI TASK
========================================================= */

if (startTask) {

    startTask.addEventListener(
        "click",
        () => {

            commandInput.focus();


            commandInput.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "center"

            });

        }
    );

}


/* =========================================================
   RUN COMMAND
========================================================= */

if (runCommand) {

    runCommand.addEventListener(
        "click",
        handleCommand
    );

}


/* =========================================================
   COMMAND INPUT — CTRL/CMD + ENTER
========================================================= */

if (commandInput) {

    commandInput.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey ||
                 event.metaKey) &&
                event.key === "Enter"
            ) {

                event.preventDefault();

                handleCommand();

            }

        }
    );

}


/* =========================================================
   COMMAND PROCESSOR
========================================================= */

function handleCommand() {

    const value =
        commandInput.value.trim();


    /*
       Prevent empty commands.
    */

    if (!value) {

        showToast(
            "Please enter a task first."
        );

        commandInput.focus();

        return;

    }


    /*
       Save command locally in application state.
    */

    AppState.commandHistory.push({

        command:
            value,

        createdAt:
            new Date().toISOString(),

        status:
            "received"

    });


    /*
       Escape user input before inserting into HTML.
    */

    const safeValue =
        escapeHtml(value);


    /*
       Frontend demo response.

       Later this section will be replaced with:
       AI Manager → Task Planner → Agent Router
       → Execution → QA → Proof → Delivery
    */

    commandResult.innerHTML = `

        <strong>
            Task received.
        </strong>

        <br>

        The AI Manager has received:

        <strong>
            “${safeValue}”
        </strong>

        <br><br>

        <span>
            Frontend demo mode:
            the future AI Manager will analyze the task,
            create a plan, select the required agents,
            execute the work, test the result,
            and prepare the delivery package.
        </span>

    `;


    commandResult.classList.add(
        "visible"
    );


    showToast(
        "Command added to AI task queue."
    );

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        () => {

            showToast(
                "3 notifications are waiting."
            );

        }
    );

}


/* =========================================================
   ACTIVITY
========================================================= */

if (activityBtn) {

    activityBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Activity module will be connected next."
            );

        }
    );

}


/* =========================================================
   ACTIVE WORK MORE BUTTONS
========================================================= */

document
    .querySelectorAll(".more-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showToast(
                    "Work actions will be available after the Task Manager integration."
                );

            }
        );

    });


/* =========================================================
   CLOSE SIDEBAR WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            window.innerWidth <= 1000 &&
            AppState.sidebarOpen &&
            !sidebar.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            closeSidebar();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeSidebar();

        }

    }
);


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 1000
        ) {

            closeSidebar();

        }

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

function initializeWorkOS() {

    setPage(
        "dashboard"
    );


    console.log(
        "Sanaullah AI WorkOS initialized."
    );


    console.log(
        "Frontend status: Ready"
    );


    console.log(
        "AI Backend status: Not connected yet"
    );

}


/* =========================================================
   START APPLICATION
========================================================= */

initializeWorkOS();
