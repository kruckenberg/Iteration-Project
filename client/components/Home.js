import React, { useState, useEffect } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';
import 'highlight.js/styles/darcula.css';
import hljs from 'highlight.js';
const path = require('path')
const stringifyObject = require('stringify-object');
hljs.initHighlightingOnLoad();

const Home = (props) => {
	// here we tie the selections to the state selected, and the logic is so that
	// some of the logic is dependent on other radios or checkboxes
  
  // RATS NEST OBJ TO TEST HIGHLIGHTING
  // 

   var obj = {
    entry: "path.resolve(__dirname, './client/index.js')",
    output: {
      path: "path.resolve(__dirname, 'build')",
      // publicPath: '/build/',
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: "/\.jsx?/",
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],    },
    plugins: [
      "new LodashModuleReplacementPlugin",
      "new HtmlWebpackPlugin({ appMountId: 'app', filename: 'index.html' })",
      "new CopyPlugin({ patterns: [{ from: 'src/index.html' }], })","new HtmlWebpackPlugin({ appMountId: 'app', filename: 'index.html' })","new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false, })",
      "new MiniCssExtractPlugin()","new CleanWebpackPlugin()"
    ],    
    mode: process.env.NODE_ENV,
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      // host: 'localhost',
      // port: 8080,
      contentBase: "path.join(__dirname, './client')",
      publicPath: '/build/',
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },  
  };
  // const stringy = JSON.stringify(obj, undefined, 2);
  const pretty = stringifyObject(obj, {
    transform: (obj, prop, originalResult) => {
        if (prop === 'path' || prop === 'entry' || prop === 'contentBase' || prop === 'test') {
            return originalResult.replace(/['"]+/g, '');
          } else if (prop === 'plugins') {
            if (originalResult.includes('new')) {
              return originalResult.replace(/[']+/g, '').replace(/\\/g, "'");
            } else {
              return originalResult;
            }
          } else {
            return originalResult; 
        }
    },
    indent: '  ',
});

	return (
		<div className='homeOuterContainer'>
			<div className='homeMessage'>
				<p>Tell us about your toolkit. What do you need to build your application?</p>
			</div>
			<div className='homeContainer'>
				<div className='optionsContainer'>
					<ul><strong>Frontend Library</strong>
						<li><input type='radio' name='library' checked={props.selected.noLibrary} onChange={() => props.setSelected({ ...props.selected, noLibrary: (!props.selected.noLibrary), react: false })} /> No Library</li>
						<li><input type='radio' name='library' checked={props.selected.react} onChange={() => props.setSelected({ ...props.selected, noLibrary: false, react: (!props.selected.react) })} /> React</li>
						<li><input type='radio' checked={false} readOnly></input>Vue*</li>
						<li><input type='radio' checked={false} readOnly></input>Svelte*</li>
					</ul>
					<ul><strong>Test Framework</strong>
						<li><input type='checkbox' checked={false} readOnly></input>Jest*</li>
						<li><input type='checkbox' checked={false} readOnly></input>Mocha*</li>
						<li><input type='checkbox' checked={false} readOnly></input>Chai*</li>
					</ul>
					<ul><strong>UI</strong>
						<li><input type='checkbox' checked={props.selected.bootstrap} onChange={() => props.setSelected({ ...props.selected, bootstrap: (!props.selected.bootstrap), css: true })} /> Bootstrap</li>
					</ul>
					<ul><strong>Transpiler</strong>
						<li><input type='checkbox' checked={true} readOnly /> Babel</li>
						<li><input type='checkbox' checked={false} readOnly></input>Typescript*</li>
					</ul>
					<ul><strong>Styling</strong>
						<li><input type='checkbox' checked={props.selected.css} onChange={() => props.setSelected({ ...props.selected, css: (!props.selected.css) })} /> CSS</li>
						<li><input type='checkbox' checked={props.selected.sass} onChange={() => props.setSelected({ ...props.selected, sass: (!props.selected.sass) })} /> Sass</li>
						<li><input type='checkbox' checked={false} readOnly></input>SCSS*</li>
					</ul>
					<ul><strong>Linting</strong>
						<li><input type='checkbox' checked={false} readOnly></input>ESLint*</li>
						<li><input type='checkbox' checked={false} readOnly></input>Prettier*</li>
					</ul>
					<ul><strong>Webpack Plugins</strong>
						<li><input type='checkbox' checked={props.selected.htmlWP} onChange={() => props.setSelected({ ...props.selected, htmlWP: (!props.selected.htmlWP) })} /> HTML Webpack Plugin</li>
						<li><input type='checkbox' checked={props.selected.miniCssWP} onChange={() => props.setSelected({ ...props.selected, miniCssWP: (!props.selected.miniCssWP) })} /> MiniCSSExtract Plugin</li>
					</ul>
				</div>
				<p style={{ color: "forestgreen" }}>* denotes dependencies that are not available for selection in the MVP.</p>
				<Link className='start' to='/installs'>
					<button className='startButton'>Start</button>
				</Link>
			</div>
  <div className="codeBlock"><pre><code class="javascript">{`const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');\n\nmodule.exports = `}{pretty}</code></pre></div>
		</div>
	)
}

export default Home;