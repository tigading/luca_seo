const express = require('express');
const app = express();

const axios = require('axios').create();

function _TO_WEEK(date) {
	let dateCheck;
	if (!date || date.toLowerCase() === 'invalid date') {
		return null;
	}
	if (date) {
		const data = date.split('-');
		dateCheck = new Date(+data[0], +data[1] - 1, +data[2]);
	}
	if (!dateCheck) {
		return null;
	}
	let oneJan = new Date(dateCheck.getFullYear(), 0, 1);
	let numberOfDays = Math.floor((dateCheck - oneJan) / (24 * 60 * 60 * 1000));
	return Math.ceil((dateCheck.getDay() + 1 + numberOfDays) / 7);
}

function _TO_MONTH(date) {
	if (!date || date.toLowerCase() === 'invalid date') {
		return null;
	}
	if (date) {
		const data = date.split('-');
		return +data[1] + 1;
	}
	return new Date().getFullYear();
}

function _TO_YEAR(date) {
	if (!date || date.toLowerCase() === 'invalid date') {
		return null;
	}
	if (date) {
		const data = date.split('-');
		return +data[0];
	}
	return new Date().getFullYear();
}

function SEO(title, description, cover, url) {
	return `<head>
			     <meta charset="utf-8" />
			     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
			     <meta name="title" content="${title}" />
			     <meta name="description" content="${description}"/>
			     <meta name="image" content="${cover}" />
			     <meta name="type" content="article" />
			     <meta property="url" content="${url}" />
			     <meta name="og:title" content="${title}"/>
			     <meta name="og:description" content="${description}"/>
			     <meta name="og:image" content="${cover}" />
			     <meta name="og:type" content="article" />
			     <meta property="og:url" content="${url}" />
			     <title>${title}</title>
		     </head>`;
}

app.get('/l/:token', (req, res) => {
	const token = req.params?.token;
	axios
		.get(
			`https://api-beta.luca.education/api/v1/lesson_reports/show_by_token?token=${token}`
		)
		.then(function (response) {
			const { data } = response.data;
			const title = `Trung tâm ${
				data?.org?.name || ''
			} | Báo cáo buổi học của bé ${data?.student?.name || ''}`;
			const description = `Ấn vào đường dẫn để xem báo cáo kết quả học tập của con`;
			const cover = `https://drive.google.com/uc?id=1lyitXKOgB2x3WOKuPzEcIzsHP_jy1JyK`;
			const url = `www.app-beta.luca.education`;
			response = SEO(title, description, cover, url);
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
			res.send(error);
		});
});

app.get('/w/:token', (req, res) => {
	const token = req.params?.token;
	axios
		.get(
			`https://api-beta.luca.education/api/v1/weekly_reports/show_by_token?token=${token}`
		)
		.then(function (response) {
			const { data } = response.data;
			const title = `Trung tâm ${
				data?.org?.name || ''
			} | Báo cáo tuần ${_TO_WEEK(data?.week_start)} năm ${_TO_YEAR(
				data?.week_start
			)} của bé ${data?.student?.name || ''}`;
			const description = `Ấn vào đường dẫn để xem báo cáo kết quả học tập của con`;
			const cover = `https://drive.google.com/uc?id=1P5_hV5jhzWAN4V3L2fgJ_4RgwfxmdzW0`;
			const url = `www.app-beta.luca.education`;
			response = SEO(title, description, cover, url);
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
			res.send(error);
		});
});

app.get('/m/:token', (req, res) => {
	const token = req.params?.token;
	axios
		.get(
			`https://api-beta.luca.education/api/v1/monthly_reports/show_by_token?token=${token}`
		)
		.then(function (response) {
			const { data } = response.data;
			const title = `Trung tâm ${
				data?.org?.name || ''
			} | Báo cáo kế hoạch tháng ${_TO_MONTH(
				data?.month_start
			)} năm ${_TO_YEAR(data?.month_start)} của bé ${
				data?.student?.name || ''
			}`;
			const description = `Ấn vào đường dẫn để xem báo cáo kết quả học tập của con`;
			const cover = `https://drive.google.com/uc?id=1P5_hV5jhzWAN4V3L2fgJ_4RgwfxmdzW0`;
			const url = `www.app-beta.luca.education`;
			response = SEO(title, description, cover, url);
			res.send(response);
		})
		.catch(function (error) {
			console.log(error);
			res.send(error);
		});
});

app.listen(3000, () => {
	console.log('Server started at port 3000');
});
