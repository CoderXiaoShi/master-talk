<template>
    <div class="page">
      <div class="header">
        <img class="header-img" src="@/assets/vue.svg" alt="header" />
        <div class="header-info">
          <div class="time">22:24 🌙</div>
          <div class="signals">
            <span class="signal">📶</span>
            <span class="wifi">📡</span>
            <span class="battery">🔋</span>
          </div>
        </div>
      </div>
      <div class="profile">
        <!-- <img class="avatar" src="/assets/vue.svg" alt="avatar" /> -->
        <div class="name">石兴龙-程序员小石</div>
      </div>
      <div class="post">
        <div class="user-info">
          <!-- <img class="user-avatar" src="/assets/vue.svg" alt="user-avatar" /> -->
          <div class="user-name">William 麟 <span class="emoji">😊</span></div>
        </div>
        <div class="content">从一个湿粽拿到一个干粽拿</div>
        <!-- <img class="post-img" src="/assets/vue.svg" alt="hotel" /> -->
        <div class="location">武汉市 · 武汉经开希尔顿欢朋酒店</div>
        <div class="time">7分钟前</div>
      </div>
      <div class="comment">
        <div class="comment-user-info">s
          <!-- <img class="comment-user-avatar" src="/assets/vue.svg" alt="comment-user-avatar" /> -->
          <div class="comment-user-name">王文彤</div>
        </div>
        <div class="comment-content">
          换了个发型，时隔三年又回到直发在家看书研究更加健康的饮食方式炎炎夏日，非常适合静心钻研养生
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyComponent',
  };
  </script>
  
  <style lang="less">
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    .header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .header-img {
        width: 100%;
      }
      .header-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .time {
          font-size: 12px;
          color: #fff;
        }
        .signals {
          display: flex;
          .signal, .wifi, .battery {
            margin-left: 5px;
          }
        }
      }
    }
    .profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        font-size: 16px;
        margin-top: 10px;
      }
    }
    .post {
      width: 100%;
      padding: 10px;
      .user-info {
        display: flex;
        align-items: center;
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .user-name {
          font-size: 14px;
          margin-left: 10px;
          .emoji {
            margin-left: 5px;
          }
        }
      }
      .content {
        margin-top: 10px;
        font-size: 14px;
      }
      .post-img {
        width: 100%;
        margin-top: 10px;
      }
      .location {
        margin-top: 5px;
        font-size: 12px;
        color: #888;
      }
      .time {
        margin-top: 5px;
        font-size: 12px;
        color: #aaa;
      }
    }
    .comment {
      width: 100%;
      padding: 10px;
      .comment-user-info {
        display: flex;
        align-items: center;
        .comment-user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .comment-user-name {
          font-size: 14px;
          margin-left: 10px;
        }
      }
      .comment-content {
        margin-top: 5px;
        font-size: 14px;
      }
    }
  }
  </style>
  