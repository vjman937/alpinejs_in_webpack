
//x-data数据复用
document.addEventListener('alpine:init', () => {          
    //定义workspace组件用的所有变量和函数
    Alpine.data('workspace', function () {
        return {
            //*****************************  全局变量  ***************************//
            //所有工作空间列表
            'workspaces': [
                {'id': 1, 'label': '解析报文', 'url': 'http://127.0.0.1:3000/static/html/message_parse.html' },
                {'id': 2, 'label': '字符处理', 'url': 'http://127.0.0.1:3000/static/html/string_handle.html' },
                //{'id': 3, 'label': '数据查询', 'url': undefined             },
                //{'id': 4, 'label': '日志处理', 'url': undefined             },
            ],
            //已经加载的工作空间
            'loadedWorkspaces': this.$persist({}),
            //当前功能ID
            'currentId': this.$persist(1),
            //默认工作区ID
            'defaultId': this.$persist(1),

            //*****************************  全局函数  ***************************//
            printDebugInfo() {
                console.log(this.loadedWorkspaces);
                console.log('currentId: '+ this.currentId);
            },

            getWorkspaceInfoById(id) {
                let result = {'bOk': false, 'ret': undefined};
                //console.log("getWorkspaceInfoById");
                //console.log(id);
                for (let i = 0; i < this.workspaces.length; i++) {
                    if (id === this.workspaces[i]['id']) {
                        result['bOk'] = true;
                        result['ret'] = this.workspaces[i];
                        //console.log("get");
                        break;
                    }
                }

                return result;
            },

            async getWorkspaceHtml(id) {
                let result = {'bOk': false, 'ret': undefined};
                let info = this.getWorkspaceInfoById(id);
                if (info['bOk']) {
                    let url = info['ret']['url'];
                    // console.log("url:");
                    // console.log(url);
                    result['bOk'] = true;
                    result['ret'] = await ((await fetch(url)).text());
                    //console.log(result['ret']);
                } else {
                    console.log("getWorkspaceHtml: Invalid id");
                    console.log(id);
                }

                return result;
            },

            async loadWorkspace(id) {
                //console.log(this.loadedWorkspaces);
                //如果当前队列没有指定id的界面，则加载对应界面到本地
                if (false === Object.keys(this.loadedWorkspaces).includes(id)) {
                    //console.log("load unsaved id");
                    let html = (await this.getWorkspaceHtml(id))['ret'];
                    // console.log("html");
                    // console.log(html);
                    this.loadedWorkspaces[id] = html;
                    //console.log("loadedWorkspaces");
                    console.log(this.loadedWorkspaces);
                    this.currentId = id;
                } else {
                    console.log("go go go");
                }
            },

            initWorkspace() {
                //初始化载入默认Id界面
                console.log("initWorkspace called");
                this.loadWorkspace(this.defaultId);
                this.currentId = this.defaultId;
            },

            async updateWorkspace() {
                if (0 === this.workspaces.length) {
                    this.initWorkspace;
                } else {
                    await this.loadWorkspace(this.currentId);
                }
            },

            getCurrentWorkspace() {
                return this.loadedWorkspaces[this.currentId];
            },

            setCurrentId(id) {
                this.currentId = id;
            },

            getWorkspaces() {
                return this.workspaces;
            }
        };
    }),

    //定义footer组件用的所有变量和函数
    Alpine.data('footer', () => {
        return {
            message: "列控小喇叭: Alpine is working..."
        };
    })
});