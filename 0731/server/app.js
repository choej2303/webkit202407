const http = require('http');
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

const saramList = [
    { no: 102, name: '김길동', email: 'kim@kildong.com', job: '도둑', age: 23 },
    { no: 103, name: '김길동2', email: 'kim1@kildong.com', job: '경찰', age: 20 },
    { no: 104, name: '김길동3', email: 'kim2@kildong.com', job: '시민', age: 24 },
];
let no = 105

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/saram', (req, res) => {
    const message = '사람 정보 관리 페이지';
    req.app.render('saram', { message, saramList }, (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error rendering page');
            return;
        }
        res.end(html);
    });
});

app.get('/saram/detail', (req, res) => {
    const idx = saramList.findIndex((saram) => saram.no === parseInt(req.query.no, 10));
    if (idx === -1) {
        res.status(404).send('사람을 찾을 수 없습니다.');
        return;
    }
    const saram = saramList[idx];
    req.app.render('saramDetail', { saram }, (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error rendering page');
            return;
        }
        res.end(html);
    });
});

app.get('/saram/edit', (req, res) => {
    const idx = saramList.findIndex((saram) => saram.no === parseInt(req.query.no, 10));
    if (idx === -1) {
        res.status(404).send('사람을 찾을 수 없습니다.');
        return;
    }
    const saram = saramList[idx];
    req.app.render('saramEdit', { saram }, (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error rendering page');
            return;
        }
        res.end(html);
    });
});

app.get('/saram/update', (req, res) => {
    const updatedSaram = {
        no: parseInt(req.query.no),
        name: req.query.name,
        email: req.query.email,
        job: req.query.job,
        age: req.query.age,
    };

    const idx = saramList.findIndex((saram) => saram.no === updatedSaram.no);
    if (idx === -1) {
        res.status(404).send('사람을 찾을 수 없습니다.');
        return;
    }

    saramList[idx] = updatedSaram;

    // 업데이트 후 /saram/detail로 리디렉션
    res.redirect(`/saram/detail?no=${updatedSaram.no}`);
});


server.listen(port, () => {
    console.log('Server started on port ' + port);
});
