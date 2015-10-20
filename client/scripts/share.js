var socialUrls = {
	wechat: "http://www.ftchinese.com/m/corp/qrshare.html?&amp;url={{url}}&amp;title={{title}}&amp;ccode=2C1A1408",
	weibo: "http://service.weibo.com/share/share.php?&amp;url={{url}}&amp;title={{summary}}&amp;searchPic=true&amp;lang=zh_cn&amp;appkey=4221537403",
	linkedin: "http://www.linkedin.com/shareArticle?mini=true&amp;url={{url}}&amp;title={{title}}&amp;summary={{summary}}&amp;source=FT中文网",
};
var socialNames = {
	wechat: "微信",
	weibo: "微博",
	linkedin: "LinkedIn" 
};

var Share = {
	init: function($rootEl, config) {
		this.$rootEl = $rootEl.length > 0 ? $rootEl : $('body');
		this.config = config;

		if (this.$rootEl.children().length === 0) {
			if (!this.config) {
				this.config = {};
				this.config.links = this.$rootEl.attr('data-o-share-links') ? this.$rootEl.attr('data-o-share-links').split(' ') : [];
				this.config.url = window.location.href || '';
				this.config.title = this.$rootEl.attr('data-o-share-title') || '';
				this.config.summary = this.$rootEl.attr('data-o-share-summary') || '';
			}
		}
	},

	render: function() {
		var $ul = $('<ul/>', {
			'class': 'header-social-list'
		});

		for (var i = 0; i < this.config.links.length; i++) {
			var $li = $('<li/>');
			var $a = $('<a/>', {
				'href': this.generateSocialUrl(this.config.links[i]),
				'class': 'icons-' + this.config.links[i]
			}).text(this.getSocialName(this.config.links[i]));
			$li.append($a);
			$ul.append($li);
		}

		this.$rootEl.append($ul);
	},

	generateSocialUrl: function(socialNetwork) {
		var templateUrl = socialUrls[socialNetwork];
		templateUrl = templateUrl.replace('{{url}}', this.config.Url)
			.replace('{{title}}', encodeURIComponent(this.config.title))
			.replace('{{summary}}', encodeURIComponent(this.config.summary));
		return templateUrl;
	},

	getSocialName: function(socialNetwork) {
		return socialNames[socialNetwork];
	}

};


var config = {
	url: window.location.href,
	title: (function() {
		return $('title').eq(0).text();
	})(),
	summary: (function() {
		return $('.header-social-panel').attr('data-o-share-summary');
	})(),
	links: ['wechat', 'weibo', 'linkedin']
};

var shareLinks = Object.create(Share);
shareLinks.init($('.header-social-panel'));
shareLinks.render();

