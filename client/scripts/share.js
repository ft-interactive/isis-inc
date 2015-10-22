var socialUrls = {
	wechat: "http://www.ftchinese.com/m/corp/qrshare.html?title={{title}}&url={{url}}&ccode=2C1A1408",
	weibo: "http://service.weibo.com/share/share.php?&appkey=4221537403&url={{url}}&title=【{{title}}】{{summary}}&ralateUid=1698233740&source=FT中文网&sourceUrl=http://www.ftchinese.com/&content=utf8&searchPic=false&ccode=2G139005",
	linkedin: "http://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}&summary={{summary}}&source=FT中文网",
};

/*
  *@object share used as prototype
  */
var Share = {
	init: function(rootEl, config) {
		if (!rootEl) {
			this.rootEl = document.body;
		} else if (!(rootEl instanceof HTMLElement)) {
			this.rootEl = document.querySelector(rootEl);
		}
		this.config = config;

		if (this.rootEl.children.length === 0) {
			if (!this.config) {
				this.config = {};
				this.config.networks = this.rootEl.hasAttribute('data-o-share-links') ? this.rootEl.getAttribute('data-o-share-links').split(' ') : [];
				this.config.url = window.location.href || '';
				this.config.title = this.rootEl.getAttribute('data-o-share-title') || '';
				this.config.summary = this.rootEl.getAttribute('data-o-share-summary') || '';
			}
			this.render();
		}
	},

	render: function() {
		var ulElement = document.createElement('ul');

		for (var i = 0; i < this.config.networks.length; i++) {
			var network = this.config.networks[i];
			var networkName = this.config.networkName[network];

			var liElement = document.createElement('li');
			var aElement = document.createElement('a');
			aElement.href = this.generateSocialUrl(network);
			aElement.target = '_blank';
			aElement.classList.add('share-links__link');
			aElement.classList.add('share-links__link--' + network);
			
			var aText = document.createTextNode(networkName);
			aElement.appendChild(aText);
			liElement.appendChild(aElement);
			ulElement.appendChild(liElement);
		}

		this.rootEl.appendChild(ulElement);
	},

	generateSocialUrl: function(socialNetwork) {
		var templateUrl = socialUrls[socialNetwork];
		templateUrl = templateUrl.replace('{{url}}', encodeURIComponent(this.config.url))
			.replace('{{title}}', encodeURIComponent(this.config.title))
			.replace('{{summary}}', encodeURIComponent(this.config.summary));
		return templateUrl;
	}
};

var config = {
	url: window.location.href,
	title: (function() {
		return document.getElementsByTagName('title')[0].firstChild.nodeValue;
	})(),
	summary: (function() {
		var descElement = document.querySelector('meta[property="og:description"]');
		return descElement.hasAttribute('content') ? descElement.getAttribute('content') : '';
	})(),
	networks: ['wechat', 'weibo', 'linkedin'],
	networkName: {
		wechat: "微信",
		weibo: "微博",
		linkedin: "LinkedIn" 
	}

};

var shareLinks = Object.create(Share);
shareLinks.init('.share-links', config);