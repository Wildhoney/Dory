<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html>
            <head>

                <title><xsl:value-of select="rss/channel/title" /> - RSS</title>

                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="alternate" type="application/rss+xml" href="/rss" />
                <link rel="stylesheet" type="text/css" href="/dory.css" />
                <link href="https://fonts.googleapis.com/css?family=Lato:400,300,700" rel="stylesheet" type="text/css" />
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

            </head>
            <body>

                <section class="dory">
                    <section class="layout feed">

                        <header>
                            <span>
                                <h1>
                                    <a href="/">
                                        <xsl:value-of select="rss/channel/title" /><label>RSS</label>
                                    </a>
                                </h1>
                            </span>
                        </header>

                        <main class="page posts">

                            <h2>
                                Posts
                                <label>(<xsl:value-of select="count(rss/channel/item)" /> Posts)</label>
                            </h2>

                            <xsl:for-each select="rss/channel/item">

                                <main class="post component">

                                    <xsl:if test="position() = 1">
                                        <xsl:attribute name="class">post component first</xsl:attribute>
                                    </xsl:if>

                                    <xsl:if test="position() = last()">
                                        <xsl:attribute name="class">post component last</xsl:attribute>
                                    </xsl:if>

                                    <h3>
                                        <a class="invert">
                                            <xsl:attribute name="href">
                                                post/<xsl:value-of select="slug"/>
                                            </xsl:attribute>
                                            <xsl:value-of select="title" />
                                        </a>
                                    </h3>

                                    <datetime><xsl:value-of select="pubDate" /></datetime>
                                    <article><xsl:value-of select="description" disable-output-escaping="yes" /></article>

                                </main>

                            </xsl:for-each>

                        </main>

                        <footer>
                            <span>
                                <aside>
                                    Powered by <a href="https://github.com/Wildhoney/Dory">Dory</a>.
                                </aside>
                            </span>
                        </footer>

                    </section>
                </section>

            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
