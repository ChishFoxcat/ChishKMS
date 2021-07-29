# KMS状态展示
![repo-size](https://img.shields.io/github/repo-size/ChishFoxcat/ChishKMS)
![last-commit](https://img.shields.io/github/last-commit/ChishFoxcat/ChishKMS/master)
![read-the-docs](https://img.shields.io/readthedocs/ChishKMS)
### 工作状态页面（HTML）的编写
> 在页面上也能获取服务器的实时状态（每60秒获取1次）


## API
从 [UpTimeRobot API](https://uptimerobot.com/api/) 获取 KMS 服务器运行状态

### 配置参数
KMS 服务的监控器 ID: `你在 UptimeRobot 的监控器 ID`

### 伪静态规则
API 请求地址将为 `{你的域名}/api/status`<br/>
说明：
- `location /api/status` 中的 `/api/status` 为伪静态转发入口（转发的原因是不想让人看见是 PHP 脚本，而且也会看起来比较好看）；
- `rewrite ^(.*)$ /kmsapi/uptimerobot.php$1 last;` 中的 `/kmsapi/` 为 API 目录。

#### 规则
```nginx
location /api/status {
    if (!-e $request_filename) {
       rewrite ^(.*)$ /kmsapi/uptimerobot.php$1 last;
    }
}

``` 
