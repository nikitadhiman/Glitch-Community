# project collections

website = "https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2FfirstWebsiteCRT.svg?1492038242223"

backgroundOpacity = 0.3

# note: a project object's curatedName is the file name within the ./curated/collections directory where
# the collections' projects exist. if you change the curatedName the file name must also change and vice versa

module.exports = 
  [
      name: 'First Websites'
      url: 'websites'
      curatedName: 'websites'
      img: website
      color: 'rgb(255, 120, 100)'
      description: "A look back at the sites where many people created their first web pages."
      background: "rgba(255, 120, 100, #{backgroundOpacity})"
  ]


