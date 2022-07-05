const banner = `
    __               ______              
   / /   ____  ____ /_  __/_  __________ 
  / /   / __ \\\\/ __ \`// / / / / / ___/ _ \\
 / /___/ /_/ / /_/ // / / /_/ / /  /  __/
/_____/\\____/\\__, //_/  \\__,_/_/   \\___/ 
            /____/                                 
`;

const message = `
${banner}

Powered by %cLogTure%cv0.0.1%c

%cGitHub: https://github.com/samzhangjy/logture%c
`;

const consoleLogger = () => {
  console.log(
    message,
    "background-color: #6366f1; padding: 10px; color: #fff;",
    "background-color: #eab308; padding: 10px; color: #000;",
    "",
    "font-weight: bold;",
    ""
  );
};

export default consoleLogger;
