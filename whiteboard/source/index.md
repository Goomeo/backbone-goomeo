---
title: API Reference

language_tabs:
  - javascript
  - html

toc_footers:
  - <a href='http://www.goomeo.com/'>Powered by Goomeo</a>
  - <a href='http://github.com/mpociot/whiteboard'>Documentation Powered by Whiteboard</a>

includes:
  - browserify
  - jquery
  - backbone_view
  - riot
  - components
  - loaders_components
  - form_components
  - api_eventManager
  - api_viewManager
  - api_panelManager
  - api_modalManager

search: true
---

# Introduction

Bienvenue dans la documentation de *Backbone-Goomeo*, la library tout en un pour Backbone comprenant entre autre :

- des extensions Backbone
- des validateurs Parsley
- des composants RiotJS

Vous trouverez dans cette documentation toutes les infos pour utiliser ce projet au sein du votre.

## Prérequis

**Attention** : Cette library a été conçue pour être utilisée au sein d'un projet pour du Front et compilé avec [Browserify](http://browserify.org/).

Vous devez impérativement avoir NodeJS >= 0.12 pour pouvoir utiliser cette library.

## Compatibilité

Normalement tous les composants Riot et le code Javascript sont compatible sous ie9+. Toutefois, plusieurs animations CSS et la police d'icône ne fonctionneront pas dessus.

## Installation

```bash
npm install --save backbone-goomeo
```

