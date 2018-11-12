<template>
    <div class="home">
        <div class="box">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="转码视频:">
                    <el-input v-model="form.inputPath">
                        <el-button slot="append" icon="el-icon-search" @click="handleSelectMedia"/>
                    </el-input>
                </el-form-item>
                <el-form-item label="输出路径:">
                    <el-input v-model="form.outputPath">
                        <el-button slot="append" icon="el-icon-search" @click="handleOutputPath"/>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleConvert">{{ btnState }}</el-button>
                    <el-button v-if="isConverting" type="primary" @click="handleCancelConvert">取消转码</el-button>
                </el-form-item>
            </el-form>
            <el-progress type="circle" :class="classObject" :stroke-width="12" color="#13ce66" :percentage=convertPercent />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Model } from 'vue-property-decorator';
    import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
    import { State, Getter, Action, Mutation, namespace } from 'vuex-class';

    const { dialog } = require('electron').remote;
    // const ipc = require('electron-better-ipc');
    const { ipcRenderer } = require('electron');

    const someModule = namespace('home');

    interface Iform {
        inputPath: string,
        outputPath: string
    }

    @Component({
        components: {
            HelloWorld,
        },
    })
    export default class Home extends Vue {
        @someModule.State test: any;

        private form: Iform = {
            inputPath: '',
            outputPath: ''
        };
        private btnState: string = '开始转码';
        private convertPercent: number = 0;
        private isConverting: boolean = false;

        mounted() {
            // console.log(this.test);
            this.initIpc();
        }
        get classObject() {
           return { 'c-hide': !this.isConverting };
        }
        // 初始化ipc监听
        initIpc() {
            const me = this;
            ipcRenderer.on('do-convert-success', (event:any, arg:any) => {
                // console.log(arg, '渲染进程收到信息,转码成功');
                const info = `转码成功！保存路径为${arg}`;
                this.btnState = '开始转码';
                me.isConverting = false;
                this.$alert(info, '提示', { confirmButtonText: '确定' });
            });
            ipcRenderer.on('do-convert-failed', (event:any, arg:any) => {
                // console.log(arg, '渲染进程收到信息,转码取消或者转码失败');
                this.btnState = '开始转码';
                me.isConverting = false;
                this.convertPercent =0;
            });
            ipcRenderer.on('do-convert-progress', (event:any, percentage:number) => {
                let per = Math.ceil(percentage * 100);
                per = per > 100 ? 100: per;
                me.convertPercent = per;
            });
        }
        handleSelectMedia() { // 选择要转码的视频
            const me = this;
            dialog.showOpenDialog(
                {
                    filters: [{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] }]
                },
                (paths) => {
                    me.form.inputPath = paths[0];
                }
            );
        }
        handleOutputPath() { // 选择转码后视频存放的位置
            const me = this;
            dialog.showOpenDialog(
                {
                    properties: ['openDirectory']
                },
                (paths) => {
                    me.form.outputPath = paths[0];
                }
            );
        }
        // 开始转码
        handleConvert() {
            const me = this;
            const opt = {
                inputPath: this.form.inputPath,
                outputPath: this.form.outputPath,
                format: 'mp4',
            };
            if (!opt.inputPath) {
                this.$message.warning('请选择要转码的视频');
                return;
            } else if (!opt.outputPath) {
                this.$message.warning('请选择视频要保存的文件夹');
                return;
            }

            if (!this.isConverting) {
                this.isConverting = true;
                this.btnState = '转码中...';
                ipcRenderer.send('do-convert', opt);
            }
        }
        // 取消转码
        handleCancelConvert() {
            ipcRenderer.send('cancel-convert');
        }
    }
</script>
