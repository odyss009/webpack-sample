// css
// require('./css/style.css')

// es2015 polyfill - regenerator, promise...
// import 'babel-polyfill';

// commonjs
import $ from 'jquery'
import angular from 'angular'
import bootstrap from 'bootstrap-sass'
import summernote from 'summernote'
import angularStrap from 'angular-strap'
import angularUiSortable from 'angular-ui-sortable'
import ngInfiniteScroll from 'ng-infinite-scroll'
import ngClip from 'ng-clip'
import checklistModel from 'checklist-model'
import uiSelect from 'ui-select'
import angularSummernote from 'angular-summernote'
import contentModule from './commonjs/content'

// es2015
import world from './es6/world'

// global
import lc from './global/lezhin'
import cms from './global/cms' //init

lc.util.show()
lc.cms.noti()

const $main = $('.main')
$main.html(`${contentModule} ${world}`)
alert(111)
