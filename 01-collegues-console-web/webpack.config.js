const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = {
    // utile pour le débogage des sources TypeScript
    devtool: 'source-map',
    // mode production pour la minification
    mode: 'production',
    // fichier d'entrée (partie web)
    entry: './src/web/index.ts',
    // répertoire de sortie
    // ici /public
    // le fichier en sortie s'appelera main.js
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js',
    },
    // résolution des fichiers
    resolve: {
        extensions: ['.ts', '.js'],
    },
    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    // configuration du serveur de développement
    devServer: {
        static: path.join(__dirname, 'public'), //contentBase
        compress: true,
        port: 9000,
        // watchContentBase: true
    },
    plugins: [
        new Dotenv()
      ]
};