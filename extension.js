// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// 获取当前编辑器中文件的绝对路径以及文件标题
	function getFileInfo() {
		const path = vscode.window.activeTextEditor.document.uri.path;
		// 获取标题，以 .md 结束，以 / 开始
		const re = /\/([^\/]+)(.md)$/;
		re.test(path);
		const title = RegExp.$1;
		return {
			path,
			title,
		};
	}

	// 获得光标位置
	function getCursorPosition() {
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor) {
			return {
				line: activeEditor.selection.active.line,
				column: activeEditor.selection.active.character,
			};
		} else {
			return {
				line: 0,
				column: 0,
			};
		}
	}

	// ## 命令逻辑
	let addTask = vscode.commands.registerCommand(
		"tickcode.addTask",
		function () {
			const { title, path } = getFileInfo();
			// 拼接 url
			const tickURL = `ticktick://x-callback-url/v1/add_task?title=[${title}](vscode://file/${path})&list=me.pkm`;
			// 打开 url
			vscode.env.openExternal(vscode.Uri.parse(tickURL));
			// 显示消息
			vscode.window.showInformationMessage("task added");
		}
	);

	// ## 命令逻辑
	let generateURL = vscode.commands.registerCommand(
		"tickcode.generateURL",
		function () {
			const { path } = getFileInfo();
			// 拼接 url
			const vscodeURL = `vscode://file/${path}`;
			// 写入剪切板
			vscode.env.clipboard.writeText(vscodeURL);
			// 显示消息
			vscode.window.showInformationMessage("URL generated");
		}
	);

	// ## 命令逻辑
	let generateMDLink = vscode.commands.registerCommand(
		"tickcode.generateMDLink",
		function () {
			const { path } = getFileInfo();
			const { line, column } = getCursorPosition();
			// 拼接 url
			const vscodeURL = `[→](vscode://file/${path}:${line}:${column})`;
			// 写入剪切板
			vscode.env.clipboard.writeText(vscodeURL);
			// 显示消息
			vscode.window.showInformationMessage("markdown link generated");
		}
	);
	context.subscriptions.push(addTask, generateURL, generateMDLink);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
