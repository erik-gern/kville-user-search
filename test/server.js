const { expect } = require('chai');
const { spawn } = require('child_process');
const fetch = require('node-fetch');

describe('[SERVER]', function(){
	let serverProcess;
	let port = 8800;
	beforeEach(function(done){
		serverProcess = spawn('node', ['main.js', `--port=${port}`]);
		serverProcess.stdout.on('data', function(data){
			done();
		});
	});
	
	afterEach(function(){
		const killedSuccessfully = serverProcess.kill();
		if (!killedSuccessfully) {
			throw new Error('Server process failed to die successfully.');
		}
	});
	
	describe('/', function(){
		it('serves the index.html page', async function(){
			const resp = await fetch(`http://localhost:${port}`);
			const text = await resp.text();
			expect(text).to.match(/html/i);
			expect(resp.status).to.equal(200);
			return;
		});		
	})
	
	describe('/search', function(){
		it('serves search results from the github api', async function(){
			const resp = await fetch(`http://localhost:${port}/search`);
			const json = await resp.json();
			expect(resp.headers.get('Content-Type')).to.match(/^application\/json/i);
			expect(json.users).to.be.an('array');
			expect(json.users.length).to.be.at.least(1);
			expect(json.total).to.be.at.least(1);
			return;
		});
	});

});