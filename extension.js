// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// 控制台提示
	console.log("ticktick active");

	// 获取路径
	const path = vscode.window.activeTextEditor.document.uri.path;
	// 获取标题，以 .md 结束，以 / 开始
	const re = /\/([^\/]+)(.md)$/;
	re.test(path);
	const title = RegExp.$1;

	let addTask = vscode.commands.registerCommand(
		"tickcode.addTask",
		function () {
			// 拼接 url
			const tickURL = `ticktick://x-callback-url/v1/add_task?title=[${title}](vscode://file/${path})&list=me.pkm`;
			// 打开 url
			vscode.env.openExternal(vscode.Uri.parse(tickURL));
			// 显示消息
			vscode.window.showInformationMessage("task added");
		}
	);

	let generateURL = vscode.commands.registerCommand(
		"tickcode.generateURL",
		function () {
			// 拼接 url
			const vscodeURL = `vscode://file/${path}`;
			// 写入剪切板
			vscode.env.clipboard.writeText(vscodeURL);
			// 显示消息
			vscode.window.showInformationMessage("URL generated");
		}
	);

	context.subscriptions.push(addTask, generateURL);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
