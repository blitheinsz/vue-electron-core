import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
    Loading,
    Input,
    Message,
    MessageBox,
    Notification,
    Upload,
    Button,
    Form,
    FormItem,
    Progress,
} from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Upload);
Vue.use(Progress);

Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
