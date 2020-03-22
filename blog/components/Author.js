import { Avatar, Divider } from "antd";
import "../public/style/components/Author.css";
import {
    QqOutlined,
    GithubOutlined,
    WeiboCircleOutlined
} from '@ant-design/icons';
const Author = () => (
    <div className="author-div com-box">
        <div>
            <Avatar size={100} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583136397652&di=a682f8a16278b663580530b42113d06e&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2F3ab1efdd52798a8b.jpg" />
            <div className="author-introduction">
                自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍
                <Divider>社交账号</Divider>
                <Avatar className="account" size={28}><QqOutlined /></Avatar>
                <Avatar className="account" size={28}><GithubOutlined /></Avatar>
                <Avatar className="account" size={28}><WeiboCircleOutlined /></Avatar>
            </div>
        </div>
    </div>
)

export default Author