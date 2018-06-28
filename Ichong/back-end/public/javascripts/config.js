var app = {};
app.config = {
	'appContainer':'#admin-app',
	'panelContainer':'.admin-app-stage',
	'headerTitle':'I 宠管理后台',
	'headerLogo':'data:img/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSgBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIACgAKAMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APqmgAoAKACgAoAwfGHiiz8K2CXd9Dcyoxx+6VQq+7yOVRByOWYZ7ZoAk8Ja8fEekx6gunXdlbzKrwGd4m85CMh1MbsMH3x69KAGa74t0TQr1bPUr5I7xrWW8W3UF5DFEpZ22gE4wD9cYGTQBW8UeMrDQPAcvixobq705IIrgJDHiRo5CoB2tjGAwJzggA0Aavh3V4de0Oy1W1iuIYLuISolxHscKemRQB5J8Rv+ElfxddWzf27HYiC4a1u9Ns3lWSOSOAC3LxqWjPmRSEsPmwRjqRQBi61qmoaF8PdH8G3w13TQ0atq2pMxurmOyXHnzJsMjIrOwRdwyq7sqNtAEvxD8MQaz4d1vW/C99Nq32yzZlubPUFi8q1itNqRO2Gkk3P5jbRtDFsP0zQB0GuaF4wF9oGgSQWF54cmgS3uEtrX/R4lVmDrIskhO0xsmGJc7ozgLuyACx8K7jxDZeJbnTNdUxQeU0VvFPchT5cLmNXit0hWONGwcfNkgAgEDNLmV+XqaKlNw9pbTY9ZpmYwQxCdphGnnMoQvtG4qCSBn05P50Ac1pPgDwto+qXGp6RodjY6jOSWuYIgrjPXaf4c98YzQBsjTnCOp1C9O7ody5X6fL/OgCnD4ejj1+HVWvLqWWO3+z7JCpVvmYhjgZyN7D6Go5Pe5jdV2qPsbdb36/1ojbqzAKACgAoAKAP/2Q=='
};



app.menuData = [
  {
    'title': '系统管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '系统管理',
        'url': '#/syetem-regular'
      }
    ]
  },

  {
    'title': '用户管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '用户管理',
        'url': '#/user-regular'
      }
    ]
  },  
  {
    'title': '作品管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '视频管理',
        'url': '#/video-manage'
      },
      {
        'title': '图片管理',
        'url': '#/image-manage'
      }
    ]
  },

  {
    'title': '宠物信息管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '宠物健康信息管理',
        'url': '#/health'
      },
      {
        'title': '疫苗接种信息管理',
        'url': '#/yimiao-regular'
      },
      {
        'title': '寄养I宠信息管理',
        'url': '#/spoil'
      },
      {
        'title': '带我回家信息管理',
        'url': '#/back-home'
      }      
    ]
  },  
  {
    'title': '文章管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '文章管理',
        'url': '#/article-regular'
      }
    ]
  },
  {
    'title': '反馈管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '反馈管理',
        'url': '#/feedback'
      }
    ]
  },  
  {
    'title': '密码管理',
    'icon': 'icon-mendianguanli',
    'items': [
      {
        'title': '修改密码',
        'url': '#/change-password'
      }
    ]
  }
];