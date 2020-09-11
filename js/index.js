const index = (() => {
  const Model = (() => {
    const app = {
      mousedown: false,
      activeApp: '',
    };

    const taskbar = {
      activeApp: ['weather', 'todoList'],
      addActiveApp: function (appID) {
        const activated = this.activeApp.some((app) => app === appID);
        if (!activated) {
          this.activeApp.push(appID);
        }
      },
      removeActiveApp: function (appID) {
        const newActiveApp = this.activeApp.filter((app) => app !== appID);
        this.activeApp = newActiveApp;
      },
    };

    return {
      app,
      taskbar,
    };
  })();

  const View = (() => {
    const activeApp = (e) => {
      e.target.parentElement.style.zIndex = '99';
      e.target.parentElement.style.opacity = '0.8';
    };

    const inactiveApp = () => {
      const apps = document.querySelectorAll('#container > section');

      apps.forEach((app) => {
        app.style.zIndex = '1';
        app.style.opacity = '1';
      });
    };

    const toggleApp = (activeApps) => {
      const apps = document.querySelectorAll('#container > section');
      let activeAppID;

      Array.from(apps).forEach((app) => {
        app.style.display = 'none';
        activeAppID = activeApps.filter((activeApp) => app.id !== activeApp);
      });

      //open the activated app
      activeAppID.forEach((ID) => {
        const openApp = document.querySelector(`#${ID}`);
        openApp.style.display = 'block';
      });

      //activate taskbar
      const taskbar_icons = document.querySelectorAll('#taskbar > div');
      taskbar_icons.forEach((icon) => {
        icon.classList.remove('active');

        activeAppID.forEach((id) => {
          if (icon.dataset.id === id) {
            icon.classList.add('active');
          }
        });
      });
      //마지막 taskbar 엑티브 안되는 문제
    };

    return {
      activeApp,
      inactiveApp,
      toggleApp,
    };
  })();

  const Controller = (() => {
    const mouseDown = (e) => {
      const targetApp = e.target.parentElement.id;
      Model.app.activeApp = targetApp;
      Model.app.mousedown = true;

      View.activeApp(e);
    };

    const mouseUp = () => {
      Model.app.mousedown = false;
      Model.app.activeApp = '';
      View.inactiveApp();
    };

    const mouseMove = (e) => {
      if (Model.app.mousedown === true) {
        const activeAppID = Model.app.activeApp;
        const activeApp = document.querySelector(`#${activeAppID}`);

        activeApp.style.left = `${e.clientX - 150}px`;
        activeApp.style.top = `${e.clientY}px`;
      }
    };

    const clicktaskbarIcon = (e) => {
      const appID = e.target.dataset.id;
      Model.taskbar.addActiveApp(appID);
      View.toggleApp(Model.taskbar.activeApp);
    };

    const clickCloseBtn = (e) => {
      const appID = e.target.parentElement.parentElement.id;
      Model.taskbar.removeActiveApp(appID);
      View.toggleApp(Model.taskbar.activeApp);
    };

    const dragBarListener = () => {
      const dragBars = document.querySelectorAll('.dragbar');
      dragBars.forEach((dragBar) => {
        dragBar.addEventListener('mousedown', (e) => mouseDown(e));
      });
      window.addEventListener('mouseup', () => mouseUp());
      window.addEventListener('mousemove', (e) => mouseMove(e));
    };

    const taskbarListner = () => {
      const taskbar_icons = document.querySelectorAll('#taskbar > div');
      taskbar_icons.forEach((icon) => {
        icon.addEventListener('click', (e) => clicktaskbarIcon(e));
      });
    };

    const closeBtnListner = () => {
      const closeBtn = document.querySelectorAll('.dragbar__closeBtn');
      closeBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => clickCloseBtn(e));
      });
    };

    return {
      dragBarListener,
      taskbarListner,
      closeBtnListner,
    };
  })();

  View.toggleApp(Model.taskbar.activeApp);
  Controller.dragBarListener();
  Controller.taskbarListner();
  Controller.closeBtnListner();
})();
