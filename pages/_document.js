import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { extractStyles } from 'evergreen-ui';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        const { css, hydrationScript } = extractStyles();

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                hydrationScript,
                css,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <html>
                <Head>
                    <meta
                        name="google-site-verification"
                        content="Lpskc10qx3ZbOBYCMbKsaqA8g6MSywwsomPL_jPtVvs"
                    />
                    <style
                        dangerouslySetInnerHTML={{ __html: this.props.css }}
                    />
                    <link rel="icon" href="/icons/favicon.png" />
                    <link rel="stylesheet" href="/styles/reset.css" />
                    <link rel="stylesheet" href="/styles/animate.css" />
                    <link rel="stylesheet" href="/styles/font.css" />
                    <link rel="stylesheet" href="/styles/index.css" />
                    <link rel="stylesheet" href="/styles/nprogress.css" />
                    <script
                        async
                        defer
                        src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"
                    ></script>
                    <script
                        async
                        defer
                        src="https://remitademo.net/payment/v1/remita-pay-inline.bundle.js"
                    ></script>
                    <script
                        async
                        defer
                        src="https://js.paystack.co/v1/inline.js"
                    ></script>
                    {this.props.hydrationScript}
                </Head>
                <Main />
                <NextScript />
            </html>
        );
    }
}
