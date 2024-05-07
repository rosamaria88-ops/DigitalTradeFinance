/*! For license information please see mojFrontend.js.LICENSE.txt */
let DTFS_TFM;
!(function () {
  const t = {
    167(t, e) {
      let n;
      let o;
      let r;
      (o = []),
        void 0 ===
          (r =
            typeof (n = function () {
              var t = {
                removeAttributeValue(t, e, n) {
                  let o;
                  let r;
                  t.getAttribute(e) &&
                    (t.getAttribute(e) == n
                      ? t.removeAttribute(e)
                      : ((o = new RegExp(`(^|\\s)${n}(\\s|$)`)),
                        (r = t.getAttribute(e).match(o)) &&
                          r.length == 3 &&
                          t.setAttribute(e, t.getAttribute(e).replace(o, r[1] && r[2] ? ' ' : ''))));
                },
                addAttributeValue(t, e, n) {
                  t.getAttribute(e)
                    ? new RegExp(`(^|\\s)${n}(\\s|$)`).test(t.getAttribute(e)) ||
                      t.setAttribute(e, `${t.getAttribute(e)} ${n}`)
                    : t.setAttribute(e, n);
                },
                dragAndDropSupported() {
                  return void 0 !== document.createElement('div').ondrop;
                },
                formDataSupported() {
                  return typeof FormData === 'function';
                },
                fileApiSupported() {
                  const t = document.createElement('input');
                  return (t.type = 'file'), void 0 !== t.files;
                },
                nodeListForEach(t, e) {
                  if (window.NodeList.prototype.forEach) return t.forEach(e);
                  for (let n = 0; n < t.length; n++) e.call(window, t[n], n, t);
                },
                initAll(e) {
                  const n = void 0 !== (e = void 0 !== e ? e : {}).scope ? e.scope : document;
                  const o = n.querySelectorAll('[data-module="moj-add-another"]');
                  t.nodeListForEach(o, function (e) {
                    new t.AddAnother(e);
                  });
                  const r = n.querySelectorAll('[data-module="moj-multi-select"]');
                  t.nodeListForEach(r, function (e) {
                    new t.MultiSelect({
                      container: e.querySelector(e.getAttribute('data-multi-select-checkbox')),
                      checkboxes: e.querySelectorAll('tbody .govuk-checkboxes__input'),
                    });
                  });
                  const i = n.querySelectorAll('[data-module="moj-password-reveal"]');
                  t.nodeListForEach(i, function (e) {
                    new t.PasswordReveal(e);
                  });
                  const a = n.querySelectorAll('[data-module="moj-rich-text-editor"]');
                  t.nodeListForEach(a, function (e) {
                    const n = { textarea: $(e) };
                    const o = e.getAttribute('data-moj-rich-text-editor-toolbar');
                    if (o) {
                      const r = o.split(',');
                      for (const i in ((n.toolbar = {}), r)) n.toolbar[r[i]] = !0;
                    }
                    new t.RichTextEditor(n);
                  });
                  const s = n.querySelectorAll('[data-module="moj-search-toggle"]');
                  t.nodeListForEach(s, function (e) {
                    new t.SearchToggle({
                      toggleButton: {
                        container: $(e.querySelector('.moj-search-toggle__toggle')),
                        text: e.getAttribute('data-moj-search-toggle-text'),
                      },
                      search: { container: $(e.querySelector('.moj-search')) },
                    });
                  });
                  let u = n.querySelectorAll('[data-module="moj-sortable-table"]');
                  t.nodeListForEach(u, function (e) {
                    new t.SortableTable({ table: e });
                  }),
                    (u = n.querySelectorAll('[data-module="moj-sortable-table"]')),
                    t.nodeListForEach(u, function (e) {
                      new t.SortableTable({ table: e });
                    });
                },
                AddAnother(t) {
                  (this.container = $(t)),
                    this.container.data('moj-add-another-initialised') ||
                      (this.container.data('moj-add-another-initialised', !0),
                      this.container.on(
                        'click',
                        '.moj-add-another__remove-button',
                        $.proxy(this, 'onRemoveButtonClick'),
                      ),
                      this.container.on('click', '.moj-add-another__add-button', $.proxy(this, 'onAddButtonClick')),
                      this.container
                        .find('.moj-add-another__add-button, moj-add-another__remove-button')
                        .prop('type', 'button'));
                },
              };
              return (
                (t.AddAnother.prototype.onAddButtonClick = function (t) {
                  const e = this.getNewItem();
                  this.updateAttributes(this.getItems().length, e), this.resetItem(e);
                  const n = this.getItems().first();
                  this.hasRemoveButton(n) || this.createRemoveButton(n),
                    this.getItems().last().after(e),
                    e.find('input, textarea, select').first().focus();
                }),
                (t.AddAnother.prototype.hasRemoveButton = function (t) {
                  return t.find('.moj-add-another__remove-button').length;
                }),
                (t.AddAnother.prototype.getItems = function () {
                  return this.container.find('.moj-add-another__item');
                }),
                (t.AddAnother.prototype.getNewItem = function () {
                  const t = this.getItems().first().clone();
                  return this.hasRemoveButton(t) || this.createRemoveButton(t), t;
                }),
                (t.AddAnother.prototype.updateAttributes = function (t, e) {
                  e.find('[data-name]').each(function (n, o) {
                    const r = o.id;
                    (o.name = $(o)
                      .attr('data-name')
                      .replace(/%index%/, t)),
                      (o.id = $(o)
                        .attr('data-id')
                        .replace(/%index%/, t)),
                      (($(o).siblings('label')[0] || $(o).parents('label')[0] || e.find(`[for="${r}"]`)[0]).htmlFor =
                        o.id);
                  });
                }),
                (t.AddAnother.prototype.createRemoveButton = function (t) {
                  t.append(
                    '<button type="button" class="govuk-button govuk-button--secondary moj-add-another__remove-button">Remove</button>',
                  );
                }),
                (t.AddAnother.prototype.resetItem = function (t) {
                  t.find('[data-name], [data-id]').each(function (t, e) {
                    e.type == 'checkbox' || e.type == 'radio' ? (e.checked = !1) : (e.value = '');
                  });
                }),
                (t.AddAnother.prototype.onRemoveButtonClick = function (t) {
                  $(t.currentTarget).parents('.moj-add-another__item').remove();
                  const e = this.getItems();
                  e.length === 1 && e.find('.moj-add-another__remove-button').remove(),
                    e.each(
                      $.proxy(function (t, e) {
                        this.updateAttributes(t, $(e));
                      }, this),
                    ),
                    this.focusHeading();
                }),
                (t.AddAnother.prototype.focusHeading = function () {
                  this.container.find('.moj-add-another__heading').focus();
                }),
                (t.ButtonMenu = function (t) {
                  (this.container = t.container),
                    (this.menu = this.container.find('.moj-button-menu__wrapper')),
                    t.menuClasses && this.menu.addClass(t.menuClasses),
                    this.menu.attr('role', 'menu'),
                    (this.mq = t.mq),
                    (this.buttonText = t.buttonText),
                    (this.buttonClasses = t.buttonClasses || ''),
                    (this.keys = { esc: 27, up: 38, down: 40, tab: 9 }),
                    this.menu.on('keydown', '[role=menuitem]', $.proxy(this, 'onButtonKeydown')),
                    this.createToggleButton(),
                    this.setupResponsiveChecks(),
                    $(document).on('click', $.proxy(this, 'onDocumentClick'));
                }),
                (t.ButtonMenu.prototype.onDocumentClick = function (t) {
                  $.contains(this.container[0], t.target) || this.hideMenu();
                }),
                (t.ButtonMenu.prototype.createToggleButton = function () {
                  (this.menuButton = $(
                    `<button class="govuk-button moj-button-menu__toggle-button ${this.buttonClasses}" type="button" aria-haspopup="true" aria-expanded="false">${this.buttonText}</button>`,
                  )),
                    this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick')),
                    this.menuButton.on('keydown', $.proxy(this, 'onMenuKeyDown'));
                }),
                (t.ButtonMenu.prototype.setupResponsiveChecks = function () {
                  (this.mql = window.matchMedia(this.mq)),
                    this.mql.addListener($.proxy(this, 'checkMode')),
                    this.checkMode(this.mql);
                }),
                (t.ButtonMenu.prototype.checkMode = function (t) {
                  t.matches ? this.enableBigMode() : this.enableSmallMode();
                }),
                (t.ButtonMenu.prototype.enableSmallMode = function () {
                  this.container.prepend(this.menuButton),
                    this.hideMenu(),
                    this.removeButtonClasses(),
                    this.menu.attr('role', 'menu'),
                    this.container.find('.moj-button-menu__item').attr('role', 'menuitem');
                }),
                (t.ButtonMenu.prototype.enableBigMode = function () {
                  this.menuButton.detach(),
                    this.showMenu(),
                    this.addButtonClasses(),
                    this.menu.removeAttr('role'),
                    this.container.find('.moj-button-menu__item').removeAttr('role');
                }),
                (t.ButtonMenu.prototype.removeButtonClasses = function () {
                  this.menu.find('.moj-button-menu__item').each(function (t, e) {
                    $(e).hasClass('govuk-button--secondary') &&
                      ($(e).attr('data-secondary', 'true'), $(e).removeClass('govuk-button--secondary')),
                      $(e).hasClass('govuk-button--warning') &&
                        ($(e).attr('data-warning', 'true'), $(e).removeClass('govuk-button--warning')),
                      $(e).removeClass('govuk-button');
                  });
                }),
                (t.ButtonMenu.prototype.addButtonClasses = function () {
                  this.menu.find('.moj-button-menu__item').each(function (t, e) {
                    $(e).attr('data-secondary') == 'true' && $(e).addClass('govuk-button--secondary'),
                      $(e).attr('data-warning') == 'true' && $(e).addClass('govuk-button--warning'),
                      $(e).addClass('govuk-button');
                  });
                }),
                (t.ButtonMenu.prototype.hideMenu = function () {
                  this.menuButton.attr('aria-expanded', 'false');
                }),
                (t.ButtonMenu.prototype.showMenu = function () {
                  this.menuButton.attr('aria-expanded', 'true');
                }),
                (t.ButtonMenu.prototype.onMenuButtonClick = function () {
                  this.toggle();
                }),
                (t.ButtonMenu.prototype.toggle = function () {
                  this.menuButton.attr('aria-expanded') == 'false'
                    ? (this.showMenu(), this.menu.find('[role=menuitem]').first().focus())
                    : (this.hideMenu(), this.menuButton.focus());
                }),
                (t.ButtonMenu.prototype.onMenuKeyDown = function (t) {
                  t.keyCode === this.keys.down && this.toggle();
                }),
                (t.ButtonMenu.prototype.onButtonKeydown = function (t) {
                  switch (t.keyCode) {
                    case this.keys.up:
                      t.preventDefault(), this.focusPrevious(t.currentTarget);
                      break;
                    case this.keys.down:
                      t.preventDefault(), this.focusNext(t.currentTarget);
                      break;
                    case this.keys.esc:
                      this.mq.matches || (this.menuButton.focus(), this.hideMenu());
                      break;
                    case this.keys.tab:
                      this.mq.matches || this.hideMenu();
                  }
                }),
                (t.ButtonMenu.prototype.focusNext = function (t) {
                  const e = $(t).next();
                  e[0] ? e.focus() : this.container.find('[role=menuitem]').first().focus();
                }),
                (t.ButtonMenu.prototype.focusPrevious = function (t) {
                  const e = $(t).prev();
                  e[0] ? e.focus() : this.container.find('[role=menuitem]').last().focus();
                }),
                (t.FilterToggleButton = function (t) {
                  (this.options = t),
                    (this.container = this.options.toggleButton.container),
                    this.createToggleButton(),
                    this.setupResponsiveChecks(),
                    this.options.filter.container.attr('tabindex', '-1'),
                    this.options.startHidden && this.hideMenu();
                }),
                (t.FilterToggleButton.prototype.setupResponsiveChecks = function () {
                  (this.mq = window.matchMedia(this.options.bigModeMediaQuery)),
                    this.mq.addListener($.proxy(this, 'checkMode')),
                    this.checkMode(this.mq);
                }),
                (t.FilterToggleButton.prototype.createToggleButton = function () {
                  (this.menuButton = $(
                    `<button class="govuk-button ${this.options.toggleButton.classes}" type="button" aria-haspopup="true" aria-expanded="false">${this.options.toggleButton.showText}</button>`,
                  )),
                    this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick')),
                    this.options.toggleButton.container.append(this.menuButton);
                }),
                (t.FilterToggleButton.prototype.checkMode = function (t) {
                  t.matches ? this.enableBigMode() : this.enableSmallMode();
                }),
                (t.FilterToggleButton.prototype.enableBigMode = function () {
                  this.showMenu(), this.removeCloseButton();
                }),
                (t.FilterToggleButton.prototype.enableSmallMode = function () {
                  this.hideMenu(), this.addCloseButton();
                }),
                (t.FilterToggleButton.prototype.addCloseButton = function () {
                  this.options.closeButton &&
                    ((this.closeButton = $(
                      `<button class="moj-filter__close" type="button">${this.options.closeButton.text}</button>`,
                    )),
                    this.closeButton.on('click', $.proxy(this, 'onCloseClick')),
                    this.options.closeButton.container.append(this.closeButton));
                }),
                (t.FilterToggleButton.prototype.onCloseClick = function () {
                  this.hideMenu(), this.menuButton.focus();
                }),
                (t.FilterToggleButton.prototype.removeCloseButton = function () {
                  this.closeButton && (this.closeButton.remove(), (this.closeButton = null));
                }),
                (t.FilterToggleButton.prototype.hideMenu = function () {
                  this.menuButton.attr('aria-expanded', 'false'),
                    this.options.filter.container.addClass('moj-js-hidden'),
                    this.menuButton.text(this.options.toggleButton.showText);
                }),
                (t.FilterToggleButton.prototype.showMenu = function () {
                  this.menuButton.attr('aria-expanded', 'true'),
                    this.options.filter.container.removeClass('moj-js-hidden'),
                    this.menuButton.text(this.options.toggleButton.hideText);
                }),
                (t.FilterToggleButton.prototype.onMenuButtonClick = function () {
                  this.toggle();
                }),
                (t.FilterToggleButton.prototype.toggle = function () {
                  this.menuButton.attr('aria-expanded') == 'false'
                    ? (this.showMenu(), this.options.filter.container.focus())
                    : this.hideMenu();
                }),
                (t.FormValidator = function (t, e) {
                  (this.form = t),
                    (this.errors = []),
                    (this.validators = []),
                    $(this.form).on('submit', $.proxy(this, 'onSubmit')),
                    (this.summary = e && e.summary ? $(e.summary) : $('.govuk-error-summary')),
                    (this.originalTitle = document.title);
                }),
                (t.FormValidator.entityMap = {
                  '&': '&amp;',
                  '<': '&lt;',
                  '>': '&gt;',
                  '"': '&quot;',
                  "'": '&#39;',
                  '/': '&#x2F;',
                  '`': '&#x60;',
                  '=': '&#x3D;',
                }),
                (t.FormValidator.prototype.escapeHtml = function (e) {
                  return String(e).replace(/[&<>"'`=\/]/g, function (e) {
                    return t.FormValidator.entityMap[e];
                  });
                }),
                (t.FormValidator.prototype.resetTitle = function () {
                  document.title = this.originalTitle;
                }),
                (t.FormValidator.prototype.updateTitle = function () {
                  document.title = `${this.errors.length} errors - ${document.title}`;
                }),
                (t.FormValidator.prototype.showSummary = function () {
                  this.summary.html(this.getSummaryHtml()),
                    this.summary.removeClass('moj-hidden'),
                    this.summary.attr('aria-labelledby', 'errorSummary-heading'),
                    this.summary.focus();
                }),
                (t.FormValidator.prototype.getSummaryHtml = function () {
                  let t = '<h2 id="error-summary-title" class="govuk-error-summary__title">There is a problem</h2>';
                  (t += '<div class="govuk-error-summary__body">'),
                    (t += '<ul class="govuk-list govuk-error-summary__list">');
                  for (let e = 0, n = this.errors.length; e < n; e++) {
                    const o = this.errors[e];
                    (t += '<li>'),
                      (t += `<a href="#${this.escapeHtml(o.fieldName)}">`),
                      (t += this.escapeHtml(o.message)),
                      (t += '</a>'),
                      (t += '</li>');
                  }
                  return (t += '</ul>'), (t += '</div>');
                }),
                (t.FormValidator.prototype.hideSummary = function () {
                  this.summary.addClass('moj-hidden'), this.summary.removeAttr('aria-labelledby');
                }),
                (t.FormValidator.prototype.onSubmit = function (t) {
                  this.removeInlineErrors(),
                    this.hideSummary(),
                    this.resetTitle(),
                    this.validate() ||
                      (t.preventDefault(), this.updateTitle(), this.showSummary(), this.showInlineErrors());
                }),
                (t.FormValidator.prototype.showInlineErrors = function () {
                  for (let t = 0, e = this.errors.length; t < e; t++) this.showInlineError(this.errors[t]);
                }),
                (t.FormValidator.prototype.showInlineError = function (e) {
                  const n = `${e.fieldName}-error`;
                  const o = `<span class="govuk-error-message" id="${n}">${this.escapeHtml(e.message)}</span>`;
                  const r = $(`#${e.fieldName}`);
                  const i = r.parents('.govuk-form-group');
                  const a = i.find('label');
                  const s = i.find('legend');
                  const u = i.find('fieldset');
                  i.addClass('govuk-form-group--error'),
                    s.length
                      ? (s.after(o), i.attr('aria-invalid', 'true'), t.addAttributeValue(u[0], 'aria-describedby', n))
                      : (a.after(o), r.attr('aria-invalid', 'true'), t.addAttributeValue(r[0], 'aria-describedby', n));
                }),
                (t.FormValidator.prototype.removeInlineErrors = function () {
                  for (let t = 0; t < this.errors.length; t++) this.removeInlineError(this.errors[t]);
                }),
                (t.FormValidator.prototype.removeInlineError = function (e) {
                  const n = $(`#${e.fieldName}`).parents('.govuk-form-group');
                  n.find('.govuk-error-message').remove(),
                    n.removeClass('govuk-form-group--error'),
                    n.find('[aria-invalid]').attr('aria-invalid', 'false');
                  const o = `${e.fieldName}-error`;
                  t.removeAttributeValue(n.find('[aria-describedby]')[0], 'aria-describedby', o);
                }),
                (t.FormValidator.prototype.addValidator = function (t, e) {
                  this.validators.push({ fieldName: t, rules: e, field: this.form.elements[t] });
                }),
                (t.FormValidator.prototype.validate = function () {
                  this.errors = [];
                  let t;
                  let e;
                  let n = null;
                  let o = !0;
                  for (t = 0; t < this.validators.length; t++)
                    for (n = this.validators[t], e = 0; e < n.rules.length; e++) {
                      if (typeof (o = n.rules[e].method(n.field, n.rules[e].params)) === 'boolean' && !o) {
                        this.errors.push({ fieldName: n.fieldName, message: n.rules[e].message });
                        break;
                      }
                      if (typeof o === 'string') {
                        this.errors.push({ fieldName: o, message: n.rules[e].message });
                        break;
                      }
                    }
                  return this.errors.length === 0;
                }),
                t.dragAndDropSupported() &&
                  t.formDataSupported() &&
                  t.fileApiSupported() &&
                  ((t.MultiFileUpload = function (t) {
                    (this.defaultParams = {
                      uploadFileEntryHook: $.noop,
                      uploadFileExitHook: $.noop,
                      uploadFileErrorHook: $.noop,
                      fileDeleteHook: $.noop,
                      uploadStatusText: 'Uploading files, please wait',
                      dropzoneHintText: 'Drag and drop files here or',
                      dropzoneButtonText: 'Choose files',
                    }),
                      (this.params = $.extend({}, this.defaultParams, t)),
                      this.params.container.addClass('moj-multi-file-upload--enhanced'),
                      (this.feedbackContainer = this.params.container.find('.moj-multi-file__uploaded-files')),
                      this.setupFileInput(),
                      this.setupDropzone(),
                      this.setupLabel(),
                      this.setupStatusBox(),
                      this.params.container.on(
                        'click',
                        '.moj-multi-file-upload__delete',
                        $.proxy(this, 'onFileDeleteClick'),
                      );
                  }),
                  (t.MultiFileUpload.prototype.setupDropzone = function () {
                    this.fileInput.wrap('<div class="moj-multi-file-upload__dropzone" />'),
                      (this.dropzone = this.params.container.find('.moj-multi-file-upload__dropzone')),
                      this.dropzone.on('dragover', $.proxy(this, 'onDragOver')),
                      this.dropzone.on('dragleave', $.proxy(this, 'onDragLeave')),
                      this.dropzone.on('drop', $.proxy(this, 'onDrop'));
                  }),
                  (t.MultiFileUpload.prototype.setupLabel = function () {
                    (this.label = $(
                      `<label for="${this.fileInput[0].id}" class="govuk-button govuk-button--secondary">${this.params.dropzoneButtonText}</label>`,
                    )),
                      this.dropzone.append(`<p class="govuk-body">${this.params.dropzoneHintText}</p>`),
                      this.dropzone.append(this.label);
                  }),
                  (t.MultiFileUpload.prototype.setupFileInput = function () {
                    (this.fileInput = this.params.container.find('.moj-multi-file-upload__input')),
                      this.fileInput.on('change', $.proxy(this, 'onFileChange')),
                      this.fileInput.on('focus', $.proxy(this, 'onFileFocus')),
                      this.fileInput.on('blur', $.proxy(this, 'onFileBlur'));
                  }),
                  (t.MultiFileUpload.prototype.setupStatusBox = function () {
                    (this.status = $('<div aria-live="polite" role="status" class="govuk-visually-hidden" />')),
                      this.dropzone.append(this.status);
                  }),
                  (t.MultiFileUpload.prototype.onDragOver = function (t) {
                    t.preventDefault(), this.dropzone.addClass('moj-multi-file-upload--dragover');
                  }),
                  (t.MultiFileUpload.prototype.onDragLeave = function () {
                    this.dropzone.removeClass('moj-multi-file-upload--dragover');
                  }),
                  (t.MultiFileUpload.prototype.onDrop = function (t) {
                    t.preventDefault(),
                      this.dropzone.removeClass('moj-multi-file-upload--dragover'),
                      this.feedbackContainer.removeClass('moj-hidden'),
                      this.status.html(this.params.uploadStatusText),
                      this.uploadFiles(t.originalEvent.dataTransfer.files);
                  }),
                  (t.MultiFileUpload.prototype.uploadFiles = function (t) {
                    for (let e = 0; e < t.length; e++) this.uploadFile(t[e]);
                  }),
                  (t.MultiFileUpload.prototype.onFileChange = function (t) {
                    this.feedbackContainer.removeClass('moj-hidden'),
                      this.status.html(this.params.uploadStatusText),
                      this.uploadFiles(t.currentTarget.files),
                      this.fileInput.replaceWith($(t.currentTarget).val('').clone(!0)),
                      this.setupFileInput(),
                      this.fileInput.focus();
                  }),
                  (t.MultiFileUpload.prototype.onFileFocus = function (t) {
                    this.label.addClass('moj-multi-file-upload--focused');
                  }),
                  (t.MultiFileUpload.prototype.onFileBlur = function (t) {
                    this.label.removeClass('moj-multi-file-upload--focused');
                  }),
                  (t.MultiFileUpload.prototype.getSuccessHtml = function (t) {
                    return `<span class="moj-multi-file-upload__success"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M25,6.2L8.7,23.2L0,14.1l4-4.2l4.7,4.9L21,2L25,6.2z"/></svg> ${t.messageHtml}</span>`;
                  }),
                  (t.MultiFileUpload.prototype.getErrorHtml = function (t) {
                    return `<span class="moj-multi-file-upload__error"> <svg class="moj-banner__icon" fill="currentColor" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" height="25" width="25"><path d="M13.6,15.4h-2.3v-4.5h2.3V15.4z M13.6,19.8h-2.3v-2.2h2.3V19.8z M0,23.2h25L12.5,2L0,23.2z"/></svg> ${t.message}</span>`;
                  }),
                  (t.MultiFileUpload.prototype.getFileRowHtml = function (t) {
                    let e = '';
                    return (
                      (e += '<div class="govuk-summary-list__row moj-multi-file-upload__row">'),
                      (e += '  <div class="govuk-summary-list__value moj-multi-file-upload__message">'),
                      (e += `<span class="moj-multi-file-upload__filename">${t.name}</span>`),
                      (e += '<span class="moj-multi-file-upload__progress">0%</span>'),
                      (e += '  </div>'),
                      (e += '  <div class="govuk-summary-list__actions moj-multi-file-upload__actions"></div>'),
                      (e += '</div>')
                    );
                  }),
                  (t.MultiFileUpload.prototype.getDeleteButtonHtml = function (t) {
                    let e = `<button class="moj-multi-file-upload__delete govuk-button govuk-button--secondary govuk-!-margin-bottom-0" type="button" name="delete" value="${t.filename}">`;
                    return (
                      (e += `Delete <span class="govuk-visually-hidden">${t.originalname}</span>`), (e += '</button>')
                    );
                  }),
                  (t.MultiFileUpload.prototype.uploadFile = function (t) {
                    this.params.uploadFileEntryHook(this, t);
                    const e = new FormData();
                    e.append('documents', t);
                    const n = $(this.getFileRowHtml(t));
                    this.feedbackContainer.find('.moj-multi-file-upload__list').append(n),
                      $.ajax({
                        url: this.params.uploadUrl,
                        type: 'post',
                        data: e,
                        processData: !1,
                        contentType: !1,
                        success: $.proxy(function (e) {
                          e.error
                            ? (n.find('.moj-multi-file-upload__message').html(this.getErrorHtml(e.error)),
                              this.status.html(e.error.message))
                            : (n.find('.moj-multi-file-upload__message').html(this.getSuccessHtml(e.success)),
                              this.status.html(e.success.messageText)),
                            n.find('.moj-multi-file-upload__actions').append(this.getDeleteButtonHtml(e.file)),
                            this.params.uploadFileExitHook(this, t, e);
                        }, this),
                        error: $.proxy(function (e, n, o) {
                          this.params.uploadFileErrorHook(this, t, e, n, o);
                        }, this),
                        xhr() {
                          const t = new XMLHttpRequest();
                          return (
                            t.upload.addEventListener(
                              'progress',
                              function (t) {
                                if (t.lengthComputable) {
                                  let e = t.loaded / t.total;
                                  (e = parseInt(100 * e, 10)),
                                    n.find('.moj-multi-file-upload__progress').text(` ${e}%`);
                                }
                              },
                              !1,
                            ),
                            t
                          );
                        },
                      });
                  }),
                  (t.MultiFileUpload.prototype.onFileDeleteClick = function (t) {
                    t.preventDefault();
                    const e = $(t.currentTarget);
                    const n = {};
                    (n[e[0].name] = e[0].value),
                      $.ajax({
                        url: this.params.deleteUrl,
                        type: 'post',
                        dataType: 'json',
                        data: n,
                        success: $.proxy(function (t) {
                          t.error ||
                            (e.parents('.moj-multi-file-upload__row').remove(),
                            this.feedbackContainer.find('.moj-multi-file-upload__row').length === 0 &&
                              this.feedbackContainer.addClass('moj-hidden')),
                            this.params.fileDeleteHook(this, t);
                        }, this),
                      });
                  })),
                (t.MultiSelect = function (t) {
                  (this.container = $(t.container)),
                    this.container.data('moj-multi-select-initialised') ||
                      (this.container.data('moj-multi-select-initialised', !0),
                      (this.toggle = $(this.getToggleHtml())),
                      (this.toggleButton = this.toggle.find('input')),
                      this.toggleButton.on('click', $.proxy(this, 'onButtonClick')),
                      this.container.append(this.toggle),
                      (this.checkboxes = $(t.checkboxes)),
                      this.checkboxes.on('click', $.proxy(this, 'onCheckboxClick')),
                      (this.checked = t.checked || !1));
                }),
                (t.MultiSelect.prototype.getToggleHtml = function () {
                  let t = '';
                  return (
                    (t += '<div class="govuk-checkboxes__item govuk-checkboxes--small moj-multi-select__checkbox">'),
                    (t += '  <input type="checkbox" class="govuk-checkboxes__input" id="checkboxes-all">'),
                    (t +=
                      '  <label class="govuk-label govuk-checkboxes__label moj-multi-select__toggle-label" for="checkboxes-all">'),
                    (t += '    <span class="govuk-visually-hidden">Select all</span>'),
                    (t += '  </label>'),
                    (t += '</div>')
                  );
                }),
                (t.MultiSelect.prototype.onButtonClick = function (t) {
                  this.checked
                    ? (this.uncheckAll(), (this.toggleButton[0].checked = !1))
                    : (this.checkAll(), (this.toggleButton[0].checked = !0));
                }),
                (t.MultiSelect.prototype.checkAll = function () {
                  this.checkboxes.each(
                    $.proxy(function (t, e) {
                      e.checked = !0;
                    }, this),
                  ),
                    (this.checked = !0);
                }),
                (t.MultiSelect.prototype.uncheckAll = function () {
                  this.checkboxes.each(
                    $.proxy(function (t, e) {
                      e.checked = !1;
                    }, this),
                  ),
                    (this.checked = !1);
                }),
                (t.MultiSelect.prototype.onCheckboxClick = function (t) {
                  t.target.checked
                    ? this.checkboxes.filter(':checked').length === this.checkboxes.length &&
                      ((this.toggleButton[0].checked = !0), (this.checked = !0))
                    : ((this.toggleButton[0].checked = !1), (this.checked = !1));
                }),
                (t.PasswordReveal = function (t) {
                  (this.el = t),
                    ($el = $(this.el)),
                    $el.data('moj-password-reveal-initialised') ||
                      ($el.data('moj-password-reveal-initialised', !0),
                      $el.attr('spellcheck', 'false'),
                      $el.wrap('<div class="moj-password-reveal"></div>'),
                      (this.container = $(this.el).parent()),
                      this.createButton());
                }),
                (t.PasswordReveal.prototype.createButton = function () {
                  (this.button = $(
                    '<button type="button" class="govuk-button govuk-button--secondary moj-password-reveal__button">Show <span class="govuk-visually-hidden">password</span></button>',
                  )),
                    this.container.append(this.button),
                    this.button.on('click', $.proxy(this, 'onButtonClick'));
                }),
                (t.PasswordReveal.prototype.onButtonClick = function () {
                  this.el.type === 'password'
                    ? ((this.el.type = 'text'),
                      this.button.html('Hide <span class="govuk-visually-hidden">password</span>'))
                    : ((this.el.type = 'password'),
                      this.button.html('Show <span class="govuk-visually-hidden">password</span>'));
                }),
                'contentEditable' in document.documentElement &&
                  ((t.RichTextEditor = function (t) {
                    (this.options = t),
                      (this.options.toolbar = this.options.toolbar || {
                        bold: !1,
                        italic: !1,
                        underline: !1,
                        bullets: !0,
                        numbers: !0,
                      }),
                      (this.textarea = this.options.textarea),
                      (this.container = $(this.textarea).parent()),
                      this.container.data('moj-rich-text-editor-initialised') ||
                        (this.container.data('moj-rich-text-editor-initialised', !0),
                        this.createToolbar(),
                        this.hideDefault(),
                        this.configureToolbar(),
                        (this.keys = { left: 37, right: 39, up: 38, down: 40 }),
                        this.container.on(
                          'click',
                          '.moj-rich-text-editor__toolbar-button',
                          $.proxy(this, 'onButtonClick'),
                        ),
                        this.container
                          .find('.moj-rich-text-editor__content')
                          .on('input', $.proxy(this, 'onEditorInput')),
                        this.container.find('label').on('click', $.proxy(this, 'onLabelClick')),
                        this.toolbar.on('keydown', $.proxy(this, 'onToolbarKeydown')));
                  }),
                  (t.RichTextEditor.prototype.onToolbarKeydown = function (t) {
                    let e;
                    switch (t.keyCode) {
                      case this.keys.right:
                      case this.keys.down:
                        var n = (e = this.toolbar.find('button[tabindex=0]')).next('button');
                        n[0] && (n.focus(), e.attr('tabindex', '-1'), n.attr('tabindex', '0'));
                        break;
                      case this.keys.left:
                      case this.keys.up:
                        var o = (e = this.toolbar.find('button[tabindex=0]')).prev('button');
                        o[0] && (o.focus(), e.attr('tabindex', '-1'), o.attr('tabindex', '0'));
                    }
                  }),
                  (t.RichTextEditor.prototype.getToolbarHtml = function () {
                    let t = '';
                    return (
                      (t += '<div class="moj-rich-text-editor__toolbar" role="toolbar">'),
                      this.options.toolbar.bold &&
                        (t +=
                          '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--bold" type="button" data-command="bold"><span class="govuk-visually-hidden">Bold</span></button>'),
                      this.options.toolbar.italic &&
                        (t +=
                          '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--italic" type="button" data-command="italic"><span class="govuk-visually-hidden">Italic</span></button>'),
                      this.options.toolbar.underline &&
                        (t +=
                          '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--underline" type="button" data-command="underline"><span class="govuk-visually-hidden">Underline</span></button>'),
                      this.options.toolbar.bullets &&
                        (t +=
                          '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--unordered-list" type="button" data-command="insertUnorderedList"><span class="govuk-visually-hidden">Unordered list</span></button>'),
                      this.options.toolbar.numbers &&
                        (t +=
                          '<button class="moj-rich-text-editor__toolbar-button moj-rich-text-editor__toolbar-button--ordered-list" type="button" data-command="insertOrderedList"><span class="govuk-visually-hidden">Ordered list</span></button>'),
                      (t += '</div>')
                    );
                  }),
                  (t.RichTextEditor.prototype.getEnhancedHtml = function (t) {
                    return `${this.getToolbarHtml()}<div class="govuk-textarea moj-rich-text-editor__content" contenteditable="true" spellcheck="false"></div>`;
                  }),
                  (t.RichTextEditor.prototype.hideDefault = function () {
                    (this.textarea = this.container.find('textarea')),
                      this.textarea.addClass('govuk-visually-hidden'),
                      this.textarea.attr('aria-hidden', !0),
                      this.textarea.attr('tabindex', '-1');
                  }),
                  (t.RichTextEditor.prototype.createToolbar = function () {
                    (this.toolbar = document.createElement('div')),
                      (this.toolbar.className = 'moj-rich-text-editor'),
                      (this.toolbar.innerHTML = this.getEnhancedHtml()),
                      this.container.append(this.toolbar),
                      (this.toolbar = this.container.find('.moj-rich-text-editor__toolbar')),
                      this.container.find('.moj-rich-text-editor__content').html(this.textarea.val());
                  }),
                  (t.RichTextEditor.prototype.configureToolbar = function () {
                    (this.buttons = this.container.find('.moj-rich-text-editor__toolbar-button')),
                      this.buttons.prop('tabindex', '-1'),
                      this.buttons.first().prop('tabindex', '0');
                  }),
                  (t.RichTextEditor.prototype.onButtonClick = function (t) {
                    document.execCommand($(t.currentTarget).data('command'), !1, null);
                  }),
                  (t.RichTextEditor.prototype.getContent = function () {
                    return this.container.find('.moj-rich-text-editor__content').html();
                  }),
                  (t.RichTextEditor.prototype.onEditorInput = function (t) {
                    this.updateTextarea();
                  }),
                  (t.RichTextEditor.prototype.updateTextarea = function () {
                    document.execCommand('defaultParagraphSeparator', !1, 'p'), this.textarea.val(this.getContent());
                  }),
                  (t.RichTextEditor.prototype.onLabelClick = function (t) {
                    t.preventDefault(), this.container.find('.moj-rich-text-editor__content').focus();
                  })),
                (t.SearchToggle = function (t) {
                  if (((this.options = t), this.options.search.container.data('moj-search-toggle-initialised'))) return;
                  this.options.search.container.data('moj-search-toggle-initialised', !0);
                  const e =
                    '<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="moj-search-toggle__button__icon"><path d="M7.433,12.5790048 C6.06762625,12.5808611 4.75763941,12.0392925 3.79217348,11.0738265 C2.82670755,10.1083606 2.28513891,8.79837375 2.28699522,7.433 C2.28513891,6.06762625 2.82670755,4.75763941 3.79217348,3.79217348 C4.75763941,2.82670755 6.06762625,2.28513891 7.433,2.28699522 C8.79837375,2.28513891 10.1083606,2.82670755 11.0738265,3.79217348 C12.0392925,4.75763941 12.5808611,6.06762625 12.5790048,7.433 C12.5808611,8.79837375 12.0392925,10.1083606 11.0738265,11.0738265 C10.1083606,12.0392925 8.79837375,12.5808611 7.433,12.5790048 L7.433,12.5790048 Z M14.293,12.579 L13.391,12.579 L13.071,12.269 C14.2300759,10.9245158 14.8671539,9.20813198 14.866,7.433 C14.866,3.32786745 11.5381325,-1.65045755e-15 7.433,-1.65045755e-15 C3.32786745,-1.65045755e-15 -1.65045755e-15,3.32786745 -1.65045755e-15,7.433 C-1.65045755e-15,11.5381325 3.32786745,14.866 7.433,14.866 C9.208604,14.8671159 10.9253982,14.2296624 12.27,13.07 L12.579,13.39 L12.579,14.294 L18.296,20 L20,18.296 L14.294,12.579 L14.293,12.579 Z"></path></svg>';
                  (this.toggleButton = $(
                    `<button class="moj-search-toggle__button" type="button" aria-haspopup="true" aria-expanded="false">${this.options.toggleButton.text}${e}</button>`,
                  )),
                    this.toggleButton.on('click', $.proxy(this, 'onToggleButtonClick')),
                    this.options.toggleButton.container.append(this.toggleButton);
                }),
                (t.SearchToggle.prototype.onToggleButtonClick = function () {
                  this.toggleButton.attr('aria-expanded') == 'false'
                    ? (this.toggleButton.attr('aria-expanded', 'true'),
                      this.options.search.container.removeClass('moj-js-hidden'),
                      this.options.search.container.find('input').first().focus())
                    : (this.options.search.container.addClass('moj-js-hidden'),
                      this.toggleButton.attr('aria-expanded', 'false'));
                }),
                (t.SortableTable = function (t) {
                  (this.table = $(t.table)),
                    this.table.data('moj-search-toggle-initialised') ||
                      (this.table.data('moj-search-toggle-initialised', !0),
                      this.setupOptions(t),
                      (this.body = this.table.find('tbody')),
                      this.createHeadingButtons(),
                      this.createStatusBox(),
                      this.initialiseSortedColumn(),
                      this.table.on('click', 'th button', $.proxy(this, 'onSortButtonClick')));
                }),
                (t.SortableTable.prototype.setupOptions = function (t) {
                  (t = t || {}),
                    (this.statusMessage = t.statusMessage || 'Sort by %heading% (%direction%)'),
                    (this.ascendingText = t.ascendingText || 'ascending'),
                    (this.descendingText = t.descendingText || 'descending');
                }),
                (t.SortableTable.prototype.createHeadingButtons = function () {
                  for (var t, e = this.table.find('thead th'), n = 0; n < e.length; n++)
                    (t = $(e[n])).attr('aria-sort') && this.createHeadingButton(t, n);
                }),
                (t.SortableTable.prototype.createHeadingButton = function (t, e) {
                  const n = t.text();
                  const o = $(`<button type="button" data-index="${e}">${n}</button>`);
                  t.text(''), t.append(o);
                }),
                (t.SortableTable.prototype.createStatusBox = function () {
                  (this.status = $(
                    '<div aria-live="polite" role="status" aria-atomic="true" class="govuk-visually-hidden" />',
                  )),
                    this.table.parent().append(this.status);
                }),
                (t.SortableTable.prototype.initialiseSortedColumn = function () {
                  const t = this.getTableRowsArray();
                  this.table
                    .find('th')
                    .filter('[aria-sort="ascending"], [aria-sort="descending"]')
                    .first()
                    .each((e, n) => {
                      const o = $(n).attr('aria-sort');
                      const r = $(n).find('button').attr('data-index');
                      const i = this.sort(t, r, o);
                      this.addRows(i);
                    });
                }),
                (t.SortableTable.prototype.onSortButtonClick = function (t) {
                  let e;
                  const n = t.currentTarget.getAttribute('data-index');
                  const o = $(t.currentTarget).parent().attr('aria-sort');
                  e = o === 'none' || o === 'descending' ? 'ascending' : 'descending';
                  const r = this.getTableRowsArray();
                  const i = this.sort(r, n, e);
                  this.addRows(i), this.removeButtonStates(), this.updateButtonState($(t.currentTarget), e);
                }),
                (t.SortableTable.prototype.updateButtonState = function (t, e) {
                  t.parent().attr('aria-sort', e);
                  let n = this.statusMessage;
                  (n = (n = n.replace(/%heading%/, t.text())).replace(/%direction%/, this[`${e}Text`])),
                    this.status.text(n);
                }),
                (t.SortableTable.prototype.removeButtonStates = function () {
                  this.table.find('thead th').attr('aria-sort', 'none');
                }),
                (t.SortableTable.prototype.addRows = function (t) {
                  for (let e = 0; e < t.length; e++) this.body.append(t[e]);
                }),
                (t.SortableTable.prototype.getTableRowsArray = function () {
                  for (var t = [], e = this.body.find('tr'), n = 0; n < e.length; n++) t.push(e[n]);
                  return t;
                }),
                (t.SortableTable.prototype.sort = function (t, e, n) {
                  return t.sort(
                    $.proxy(function (t, o) {
                      const r = $(t).find('td,th').eq(e);
                      const i = $(o).find('td,th').eq(e);
                      const a = this.getCellValue(r);
                      const s = this.getCellValue(i);
                      return n === 'ascending' ? (a < s ? -1 : a > s ? 1 : 0) : s < a ? -1 : s > a ? 1 : 0;
                    }, this),
                  );
                }),
                (t.SortableTable.prototype.getCellValue = function (t) {
                  let e = t.attr('data-sort-value');
                  return (e = e || t.html()), $.isNumeric(e) && (e = parseInt(e, 10)), e;
                }),
                t
              );
            }) === 'function'
              ? n.apply(e, o)
              : n) || (t.exports = r);
    },
    616(t, e) {
      let n;
      !(function (e, n) {
        typeof t.exports === 'object'
          ? (t.exports = e.document
              ? n(e, !0)
              : function (t) {
                  if (!t.document) throw new Error('jQuery requires a window with a document');
                  return n(t);
                })
          : n(e);
      })(typeof window !== 'undefined' ? window : this, function (o, r) {
        const i = [];
        const a = Object.getPrototypeOf;
        const s = i.slice;
        const u = i.flat
          ? function (t) {
              return i.flat.call(t);
            }
          : function (t) {
              return i.concat.apply([], t);
            };
        const l = i.push;
        const c = i.indexOf;
        const d = {};
        const p = d.toString;
        const f = d.hasOwnProperty;
        const h = f.toString;
        const m = h.call(Object);
        const g = {};
        const v = function (t) {
          return typeof t === 'function' && typeof t.nodeType !== 'number' && typeof t.item !== 'function';
        };
        const y = function (t) {
          return t != null && t === t.window;
        };
        const b = o.document;
        const x = { type: !0, src: !0, nonce: !0, noModule: !0 };
        function w(t, e, n) {
          let o;
          let r;
          const i = (n = n || b).createElement('script');
          if (((i.text = t), e))
            for (o in x) (r = e[o] || (e.getAttribute && e.getAttribute(o))) && i.setAttribute(o, r);
          n.head.appendChild(i).parentNode.removeChild(i);
        }
        function T(t) {
          return t == null
            ? `${t}`
            : typeof t === 'object' || typeof t === 'function'
            ? d[p.call(t)] || 'object'
            : typeof t;
        }
        const k = '3.6.4';
        const C = function (t, e) {
          return new C.fn.init(t, e);
        };
        function j(t) {
          const e = !!t && 'length' in t && t.length;
          const n = T(t);
          return !v(t) && !y(t) && (n === 'array' || e === 0 || (typeof e === 'number' && e > 0 && e - 1 in t));
        }
        (C.fn = C.prototype =
          {
            jquery: k,
            constructor: C,
            length: 0,
            toArray() {
              return s.call(this);
            },
            get(t) {
              return t == null ? s.call(this) : t < 0 ? this[t + this.length] : this[t];
            },
            pushStack(t) {
              const e = C.merge(this.constructor(), t);
              return (e.prevObject = this), e;
            },
            each(t) {
              return C.each(this, t);
            },
            map(t) {
              return this.pushStack(
                C.map(this, function (e, n) {
                  return t.call(e, n, e);
                }),
              );
            },
            slice() {
              return this.pushStack(s.apply(this, arguments));
            },
            first() {
              return this.eq(0);
            },
            last() {
              return this.eq(-1);
            },
            even() {
              return this.pushStack(
                C.grep(this, function (t, e) {
                  return (e + 1) % 2;
                }),
              );
            },
            odd() {
              return this.pushStack(
                C.grep(this, function (t, e) {
                  return e % 2;
                }),
              );
            },
            eq(t) {
              const e = this.length;
              const n = +t + (t < 0 ? e : 0);
              return this.pushStack(n >= 0 && n < e ? [this[n]] : []);
            },
            end() {
              return this.prevObject || this.constructor();
            },
            push: l,
            sort: i.sort,
            splice: i.splice,
          }),
          (C.extend = C.fn.extend =
            function () {
              let t;
              let e;
              let n;
              let o;
              let r;
              let i;
              let a = arguments[0] || {};
              let s = 1;
              const u = arguments.length;
              let l = !1;
              for (
                typeof a === 'boolean' && ((l = a), (a = arguments[s] || {}), s++),
                  typeof a === 'object' || v(a) || (a = {}),
                  s === u && ((a = this), s--);
                s < u;
                s++
              )
                if ((t = arguments[s]) != null)
                  for (e in t)
                    (o = t[e]),
                      e !== '__proto__' &&
                        a !== o &&
                        (l && o && (C.isPlainObject(o) || (r = Array.isArray(o)))
                          ? ((n = a[e]),
                            (i = r && !Array.isArray(n) ? [] : r || C.isPlainObject(n) ? n : {}),
                            (r = !1),
                            (a[e] = C.extend(l, i, o)))
                          : void 0 !== o && (a[e] = o));
              return a;
            }),
          C.extend({
            expando: `jQuery${(k + Math.random()).replace(/\D/g, '')}`,
            isReady: !0,
            error(t) {
              throw new Error(t);
            },
            noop() {},
            isPlainObject(t) {
              let e;
              let n;
              return (
                !(!t || p.call(t) !== '[object Object]') &&
                (!(e = a(t)) ||
                  (typeof (n = f.call(e, 'constructor') && e.constructor) === 'function' && h.call(n) === m))
              );
            },
            isEmptyObject(t) {
              let e;
              for (e in t) return !1;
              return !0;
            },
            globalEval(t, e, n) {
              w(t, { nonce: e && e.nonce }, n);
            },
            each(t, e) {
              let n;
              let o = 0;
              if (j(t)) for (n = t.length; o < n && !1 !== e.call(t[o], o, t[o]); o++);
              else for (o in t) if (!1 === e.call(t[o], o, t[o])) break;
              return t;
            },
            makeArray(t, e) {
              const n = e || [];
              return t != null && (j(Object(t)) ? C.merge(n, typeof t === 'string' ? [t] : t) : l.call(n, t)), n;
            },
            inArray(t, e, n) {
              return e == null ? -1 : c.call(e, t, n);
            },
            merge(t, e) {
              for (var n = +e.length, o = 0, r = t.length; o < n; o++) t[r++] = e[o];
              return (t.length = r), t;
            },
            grep(t, e, n) {
              for (var o = [], r = 0, i = t.length, a = !n; r < i; r++) !e(t[r], r) !== a && o.push(t[r]);
              return o;
            },
            map(t, e, n) {
              let o;
              let r;
              let i = 0;
              const a = [];
              if (j(t)) for (o = t.length; i < o; i++) (r = e(t[i], i, n)) != null && a.push(r);
              else for (i in t) (r = e(t[i], i, n)) != null && a.push(r);
              return u(a);
            },
            guid: 1,
            support: g,
          }),
          typeof Symbol === 'function' && (C.fn[Symbol.iterator] = i[Symbol.iterator]),
          C.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (t, e) {
            d[`[object ${e}]`] = e.toLowerCase();
          });
        const S = (function (t) {
          let e;
          let n;
          let o;
          let r;
          let i;
          let a;
          let s;
          let u;
          let l;
          let c;
          let d;
          let p;
          let f;
          let h;
          let m;
          let g;
          let v;
          let y;
          let b;
          const x = `sizzle${1 * new Date()}`;
          const w = t.document;
          let T = 0;
          let k = 0;
          const C = ut();
          const j = ut();
          const S = ut();
          const A = ut();
          let E = function (t, e) {
            return t === e && (d = !0), 0;
          };
          const _ = {}.hasOwnProperty;
          let B = [];
          const D = B.pop;
          const M = B.push;
          let N = B.push;
          const $ = B.slice;
          const L = function (t, e) {
            for (let n = 0, o = t.length; n < o; n++) if (t[n] === e) return n;
            return -1;
          };
          const F =
            'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped';
          const q = '[\\x20\\t\\r\\n\\f]';
          const H = `(?:\\\\[\\da-fA-F]{1,6}${q}?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+`;
          const R = `\\[${q}*(${H})(?:${q}*([*^$|!~]?=)${q}*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(${H}))|)${q}*\\]`;
          const I = `:(${H})(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|${R})*)|.*)\\)|)`;
          const O = new RegExp(`${q}+`, 'g');
          const P = new RegExp(`^${q}+|((?:^|[^\\\\])(?:\\\\.)*)${q}+$`, 'g');
          const W = new RegExp(`^${q}*,${q}*`);
          const z = new RegExp(`^${q}*([>+~]|${q})${q}*`);
          const U = new RegExp(`${q}|>`);
          const V = new RegExp(I);
          const X = new RegExp(`^${H}$`);
          const G = {
            ID: new RegExp(`^#(${H})`),
            CLASS: new RegExp(`^\\.(${H})`),
            TAG: new RegExp(`^(${H}|[*])`),
            ATTR: new RegExp(`^${R}`),
            PSEUDO: new RegExp(`^${I}`),
            CHILD: new RegExp(
              `^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(${q}*(even|odd|(([+-]|)(\\d*)n|)${q}*(?:([+-]|)${q}*(\\d+)|))${q}*\\)|)`,
              'i',
            ),
            bool: new RegExp(`^(?:${F})$`, 'i'),
            needsContext: new RegExp(
              `^${q}*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(${q}*((?:-\\d)?\\d*)${q}*\\)|)(?=[^-]|$)`,
              'i',
            ),
          };
          const K = /HTML$/i;
          const Y = /^(?:input|select|textarea|button)$/i;
          const Q = /^h\d$/i;
          const J = /^[^{]+\{\s*\[native \w/;
          const Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
          const tt = /[+~]/;
          const et = new RegExp(`\\\\[\\da-fA-F]{1,6}${q}?|\\\\([^\\r\\n\\f])`, 'g');
          const nt = function (t, e) {
            const n = `0x${t.slice(1)}` - 65536;
            return (
              e || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320))
            );
          };
          const ot = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g;
          const rt = function (t, e) {
            return e ? (t === '\0' ? '�' : `${t.slice(0, -1)}\\${t.charCodeAt(t.length - 1).toString(16)} `) : `\\${t}`;
          };
          const it = function () {
            p();
          };
          const at = xt(
            function (t) {
              return !0 === t.disabled && t.nodeName.toLowerCase() === 'fieldset';
            },
            { dir: 'parentNode', next: 'legend' },
          );
          try {
            N.apply((B = $.call(w.childNodes)), w.childNodes), B[w.childNodes.length].nodeType;
          } catch (t) {
            N = {
              apply: B.length
                ? function (t, e) {
                    M.apply(t, $.call(e));
                  }
                : function (t, e) {
                    for (var n = t.length, o = 0; (t[n++] = e[o++]); );
                    t.length = n - 1;
                  },
            };
          }
          function st(t, e, o, r) {
            let i;
            let s;
            let l;
            let c;
            let d;
            let h;
            let v;
            let y = e && e.ownerDocument;
            const w = e ? e.nodeType : 9;
            if (((o = o || []), typeof t !== 'string' || !t || (w !== 1 && w !== 9 && w !== 11))) return o;
            if (!r && (p(e), (e = e || f), m)) {
              if (w !== 11 && (d = Z.exec(t)))
                if ((i = d[1])) {
                  if (w === 9) {
                    if (!(l = e.getElementById(i))) return o;
                    if (l.id === i) return o.push(l), o;
                  } else if (y && (l = y.getElementById(i)) && b(e, l) && l.id === i) return o.push(l), o;
                } else {
                  if (d[2]) return N.apply(o, e.getElementsByTagName(t)), o;
                  if ((i = d[3]) && n.getElementsByClassName && e.getElementsByClassName)
                    return N.apply(o, e.getElementsByClassName(i)), o;
                }
              if (n.qsa && !A[`${t} `] && (!g || !g.test(t)) && (w !== 1 || e.nodeName.toLowerCase() !== 'object')) {
                if (((v = t), (y = e), w === 1 && (U.test(t) || z.test(t)))) {
                  for (
                    ((y = (tt.test(t) && vt(e.parentNode)) || e) === e && n.scope) ||
                      ((c = e.getAttribute('id')) ? (c = c.replace(ot, rt)) : e.setAttribute('id', (c = x))),
                      s = (h = a(t)).length;
                    s--;

                  )
                    h[s] = `${c ? `#${c}` : ':scope'} ${bt(h[s])}`;
                  v = h.join(',');
                }
                try {
                  return N.apply(o, y.querySelectorAll(v)), o;
                } catch (e) {
                  A(t, !0);
                } finally {
                  c === x && e.removeAttribute('id');
                }
              }
            }
            return u(t.replace(P, '$1'), e, o, r);
          }
          function ut() {
            const t = [];
            return function e(n, r) {
              return t.push(`${n} `) > o.cacheLength && delete e[t.shift()], (e[`${n} `] = r);
            };
          }
          function lt(t) {
            return (t[x] = !0), t;
          }
          function ct(t) {
            let e = f.createElement('fieldset');
            try {
              return !!t(e);
            } catch (t) {
              return !1;
            } finally {
              e.parentNode && e.parentNode.removeChild(e), (e = null);
            }
          }
          function dt(t, e) {
            for (let n = t.split('|'), r = n.length; r--; ) o.attrHandle[n[r]] = e;
          }
          function pt(t, e) {
            let n = e && t;
            const o = n && t.nodeType === 1 && e.nodeType === 1 && t.sourceIndex - e.sourceIndex;
            if (o) return o;
            if (n) for (; (n = n.nextSibling); ) if (n === e) return -1;
            return t ? 1 : -1;
          }
          function ft(t) {
            return function (e) {
              return e.nodeName.toLowerCase() === 'input' && e.type === t;
            };
          }
          function ht(t) {
            return function (e) {
              const n = e.nodeName.toLowerCase();
              return (n === 'input' || n === 'button') && e.type === t;
            };
          }
          function mt(t) {
            return function (e) {
              return 'form' in e
                ? e.parentNode && !1 === e.disabled
                  ? 'label' in e
                    ? 'label' in e.parentNode
                      ? e.parentNode.disabled === t
                      : e.disabled === t
                    : e.isDisabled === t || (e.isDisabled !== !t && at(e) === t)
                  : e.disabled === t
                : 'label' in e && e.disabled === t;
            };
          }
          function gt(t) {
            return lt(function (e) {
              return (
                (e = +e),
                lt(function (n, o) {
                  for (var r, i = t([], n.length, e), a = i.length; a--; ) n[(r = i[a])] && (n[r] = !(o[r] = n[r]));
                })
              );
            });
          }
          function vt(t) {
            return t && void 0 !== t.getElementsByTagName && t;
          }
          for (e in ((n = st.support = {}),
          (i = st.isXML =
            function (t) {
              const e = t && t.namespaceURI;
              const n = t && (t.ownerDocument || t).documentElement;
              return !K.test(e || (n && n.nodeName) || 'HTML');
            }),
          (p = st.setDocument =
            function (t) {
              let e;
              let r;
              const a = t ? t.ownerDocument || t : w;
              return a != f && a.nodeType === 9 && a.documentElement
                ? ((h = (f = a).documentElement),
                  (m = !i(f)),
                  w != f &&
                    (r = f.defaultView) &&
                    r.top !== r &&
                    (r.addEventListener
                      ? r.addEventListener('unload', it, !1)
                      : r.attachEvent && r.attachEvent('onunload', it)),
                  (n.scope = ct(function (t) {
                    return (
                      h.appendChild(t).appendChild(f.createElement('div')),
                      void 0 !== t.querySelectorAll && !t.querySelectorAll(':scope fieldset div').length
                    );
                  })),
                  (n.cssHas = ct(function () {
                    try {
                      return f.querySelector(':has(*,:jqfake)'), !1;
                    } catch (t) {
                      return !0;
                    }
                  })),
                  (n.attributes = ct(function (t) {
                    return (t.className = 'i'), !t.getAttribute('className');
                  })),
                  (n.getElementsByTagName = ct(function (t) {
                    return t.appendChild(f.createComment('')), !t.getElementsByTagName('*').length;
                  })),
                  (n.getElementsByClassName = J.test(f.getElementsByClassName)),
                  (n.getById = ct(function (t) {
                    return (h.appendChild(t).id = x), !f.getElementsByName || !f.getElementsByName(x).length;
                  })),
                  n.getById
                    ? ((o.filter.ID = function (t) {
                        const e = t.replace(et, nt);
                        return function (t) {
                          return t.getAttribute('id') === e;
                        };
                      }),
                      (o.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && m) {
                          const n = e.getElementById(t);
                          return n ? [n] : [];
                        }
                      }))
                    : ((o.filter.ID = function (t) {
                        const e = t.replace(et, nt);
                        return function (t) {
                          const n = void 0 !== t.getAttributeNode && t.getAttributeNode('id');
                          return n && n.value === e;
                        };
                      }),
                      (o.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && m) {
                          let n;
                          let o;
                          let r;
                          let i = e.getElementById(t);
                          if (i) {
                            if ((n = i.getAttributeNode('id')) && n.value === t) return [i];
                            for (r = e.getElementsByName(t), o = 0; (i = r[o++]); )
                              if ((n = i.getAttributeNode('id')) && n.value === t) return [i];
                          }
                          return [];
                        }
                      })),
                  (o.find.TAG = n.getElementsByTagName
                    ? function (t, e) {
                        return void 0 !== e.getElementsByTagName
                          ? e.getElementsByTagName(t)
                          : n.qsa
                          ? e.querySelectorAll(t)
                          : void 0;
                      }
                    : function (t, e) {
                        let n;
                        const o = [];
                        let r = 0;
                        const i = e.getElementsByTagName(t);
                        if (t === '*') {
                          for (; (n = i[r++]); ) n.nodeType === 1 && o.push(n);
                          return o;
                        }
                        return i;
                      }),
                  (o.find.CLASS =
                    n.getElementsByClassName &&
                    function (t, e) {
                      if (void 0 !== e.getElementsByClassName && m) return e.getElementsByClassName(t);
                    }),
                  (v = []),
                  (g = []),
                  (n.qsa = J.test(f.querySelectorAll)) &&
                    (ct(function (t) {
                      let e;
                      (h.appendChild(
                        t,
                      ).innerHTML = `<a id='${x}'></a><select id='${x}-\r\\' msallowcapture=''><option selected=''></option></select>`),
                        t.querySelectorAll("[msallowcapture^='']").length && g.push(`[*^$]=${q}*(?:''|"")`),
                        t.querySelectorAll('[selected]').length || g.push(`\\[${q}*(?:value|${F})`),
                        t.querySelectorAll(`[id~=${x}-]`).length || g.push('~='),
                        (e = f.createElement('input')).setAttribute('name', ''),
                        t.appendChild(e),
                        t.querySelectorAll("[name='']").length || g.push(`\\[${q}*name${q}*=${q}*(?:''|"")`),
                        t.querySelectorAll(':checked').length || g.push(':checked'),
                        t.querySelectorAll(`a#${x}+*`).length || g.push('.#.+[+~]'),
                        t.querySelectorAll('\\\f'),
                        g.push('[\\r\\n\\f]');
                    }),
                    ct(function (t) {
                      t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                      const e = f.createElement('input');
                      e.setAttribute('type', 'hidden'),
                        t.appendChild(e).setAttribute('name', 'D'),
                        t.querySelectorAll('[name=d]').length && g.push(`name${q}*[*^$|!~]?=`),
                        t.querySelectorAll(':enabled').length !== 2 && g.push(':enabled', ':disabled'),
                        (h.appendChild(t).disabled = !0),
                        t.querySelectorAll(':disabled').length !== 2 && g.push(':enabled', ':disabled'),
                        t.querySelectorAll('*,:x'),
                        g.push(',.*:');
                    })),
                  (n.matchesSelector = J.test(
                    (y =
                      h.matches ||
                      h.webkitMatchesSelector ||
                      h.mozMatchesSelector ||
                      h.oMatchesSelector ||
                      h.msMatchesSelector),
                  )) &&
                    ct(function (t) {
                      (n.disconnectedMatch = y.call(t, '*')), y.call(t, "[s!='']:x"), v.push('!=', I);
                    }),
                  n.cssHas || g.push(':has'),
                  (g = g.length && new RegExp(g.join('|'))),
                  (v = v.length && new RegExp(v.join('|'))),
                  (e = J.test(h.compareDocumentPosition)),
                  (b =
                    e || J.test(h.contains)
                      ? function (t, e) {
                          const n = (t.nodeType === 9 && t.documentElement) || t;
                          const o = e && e.parentNode;
                          return (
                            t === o ||
                            !(
                              !o ||
                              o.nodeType !== 1 ||
                              !(n.contains
                                ? n.contains(o)
                                : t.compareDocumentPosition && 16 & t.compareDocumentPosition(o))
                            )
                          );
                        }
                      : function (t, e) {
                          if (e) for (; (e = e.parentNode); ) if (e === t) return !0;
                          return !1;
                        }),
                  (E = e
                    ? function (t, e) {
                        if (t === e) return (d = !0), 0;
                        let o = !t.compareDocumentPosition - !e.compareDocumentPosition;
                        return (
                          o ||
                          (1 &
                            (o = (t.ownerDocument || t) == (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) ||
                          (!n.sortDetached && e.compareDocumentPosition(t) === o)
                            ? t == f || (t.ownerDocument == w && b(w, t))
                              ? -1
                              : e == f || (e.ownerDocument == w && b(w, e))
                              ? 1
                              : c
                              ? L(c, t) - L(c, e)
                              : 0
                            : 4 & o
                            ? -1
                            : 1)
                        );
                      }
                    : function (t, e) {
                        if (t === e) return (d = !0), 0;
                        let n;
                        let o = 0;
                        const r = t.parentNode;
                        const i = e.parentNode;
                        const a = [t];
                        const s = [e];
                        if (!r || !i) return t == f ? -1 : e == f ? 1 : r ? -1 : i ? 1 : c ? L(c, t) - L(c, e) : 0;
                        if (r === i) return pt(t, e);
                        for (n = t; (n = n.parentNode); ) a.unshift(n);
                        for (n = e; (n = n.parentNode); ) s.unshift(n);
                        for (; a[o] === s[o]; ) o++;
                        return o ? pt(a[o], s[o]) : a[o] == w ? -1 : s[o] == w ? 1 : 0;
                      }),
                  f)
                : f;
            }),
          (st.matches = function (t, e) {
            return st(t, null, null, e);
          }),
          (st.matchesSelector = function (t, e) {
            if ((p(t), n.matchesSelector && m && !A[`${e} `] && (!v || !v.test(e)) && (!g || !g.test(e))))
              try {
                const o = y.call(t, e);
                if (o || n.disconnectedMatch || (t.document && t.document.nodeType !== 11)) return o;
              } catch (t) {
                A(e, !0);
              }
            return st(e, f, null, [t]).length > 0;
          }),
          (st.contains = function (t, e) {
            return (t.ownerDocument || t) != f && p(t), b(t, e);
          }),
          (st.attr = function (t, e) {
            (t.ownerDocument || t) != f && p(t);
            const r = o.attrHandle[e.toLowerCase()];
            let i = r && _.call(o.attrHandle, e.toLowerCase()) ? r(t, e, !m) : void 0;
            return void 0 !== i
              ? i
              : n.attributes || !m
              ? t.getAttribute(e)
              : (i = t.getAttributeNode(e)) && i.specified
              ? i.value
              : null;
          }),
          (st.escape = function (t) {
            return `${t}`.replace(ot, rt);
          }),
          (st.error = function (t) {
            throw new Error(`Syntax error, unrecognized expression: ${t}`);
          }),
          (st.uniqueSort = function (t) {
            let e;
            const o = [];
            let r = 0;
            let i = 0;
            if (((d = !n.detectDuplicates), (c = !n.sortStable && t.slice(0)), t.sort(E), d)) {
              for (; (e = t[i++]); ) e === t[i] && (r = o.push(i));
              for (; r--; ) t.splice(o[r], 1);
            }
            return (c = null), t;
          }),
          (r = st.getText =
            function (t) {
              let e;
              let n = '';
              let o = 0;
              const i = t.nodeType;
              if (i) {
                if (i === 1 || i === 9 || i === 11) {
                  if (typeof t.textContent === 'string') return t.textContent;
                  for (t = t.firstChild; t; t = t.nextSibling) n += r(t);
                } else if (i === 3 || i === 4) return t.nodeValue;
              } else for (; (e = t[o++]); ) n += r(e);
              return n;
            }),
          (o = st.selectors =
            {
              cacheLength: 50,
              createPseudo: lt,
              match: G,
              attrHandle: {},
              find: {},
              relative: {
                '>': { dir: 'parentNode', first: !0 },
                ' ': { dir: 'parentNode' },
                '+': { dir: 'previousSibling', first: !0 },
                '~': { dir: 'previousSibling' },
              },
              preFilter: {
                ATTR(t) {
                  return (
                    (t[1] = t[1].replace(et, nt)),
                    (t[3] = (t[3] || t[4] || t[5] || '').replace(et, nt)),
                    t[2] === '~=' && (t[3] = ` ${t[3]} `),
                    t.slice(0, 4)
                  );
                },
                CHILD(t) {
                  return (
                    (t[1] = t[1].toLowerCase()),
                    t[1].slice(0, 3) === 'nth'
                      ? (t[3] || st.error(t[0]),
                        (t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * (t[3] === 'even' || t[3] === 'odd'))),
                        (t[5] = +(t[7] + t[8] || t[3] === 'odd')))
                      : t[3] && st.error(t[0]),
                    t
                  );
                },
                PSEUDO(t) {
                  let e;
                  const n = !t[6] && t[2];
                  return G.CHILD.test(t[0])
                    ? null
                    : (t[3]
                        ? (t[2] = t[4] || t[5] || '')
                        : n &&
                          V.test(n) &&
                          (e = a(n, !0)) &&
                          (e = n.indexOf(')', n.length - e) - n.length) &&
                          ((t[0] = t[0].slice(0, e)), (t[2] = n.slice(0, e))),
                      t.slice(0, 3));
                },
              },
              filter: {
                TAG(t) {
                  const e = t.replace(et, nt).toLowerCase();
                  return t === '*'
                    ? function () {
                        return !0;
                      }
                    : function (t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e;
                      };
                },
                CLASS(t) {
                  let e = C[`${t} `];
                  return (
                    e ||
                    ((e = new RegExp(`(^|${q})${t}(${q}|$)`)) &&
                      C(t, function (t) {
                        return e.test(
                          (typeof t.className === 'string' && t.className) ||
                            (void 0 !== t.getAttribute && t.getAttribute('class')) ||
                            '',
                        );
                      }))
                  );
                },
                ATTR(t, e, n) {
                  return function (o) {
                    let r = st.attr(o, t);
                    return r == null
                      ? e === '!='
                      : !e ||
                          ((r += ''),
                          e === '='
                            ? r === n
                            : e === '!='
                            ? r !== n
                            : e === '^='
                            ? n && r.indexOf(n) === 0
                            : e === '*='
                            ? n && r.indexOf(n) > -1
                            : e === '$='
                            ? n && r.slice(-n.length) === n
                            : e === '~='
                            ? ` ${r.replace(O, ' ')} `.indexOf(n) > -1
                            : e === '|=' && (r === n || r.slice(0, n.length + 1) === `${n}-`));
                  };
                },
                CHILD(t, e, n, o, r) {
                  const i = t.slice(0, 3) !== 'nth';
                  const a = t.slice(-4) !== 'last';
                  const s = e === 'of-type';
                  return o === 1 && r === 0
                    ? function (t) {
                        return !!t.parentNode;
                      }
                    : function (e, n, u) {
                        let l;
                        let c;
                        let d;
                        let p;
                        let f;
                        let h;
                        let m = i !== a ? 'nextSibling' : 'previousSibling';
                        const g = e.parentNode;
                        const v = s && e.nodeName.toLowerCase();
                        const y = !u && !s;
                        let b = !1;
                        if (g) {
                          if (i) {
                            for (; m; ) {
                              for (p = e; (p = p[m]); )
                                if (s ? p.nodeName.toLowerCase() === v : p.nodeType === 1) return !1;
                              h = m = t === 'only' && !h && 'nextSibling';
                            }
                            return !0;
                          }
                          if (((h = [a ? g.firstChild : g.lastChild]), a && y)) {
                            for (
                              b =
                                (f =
                                  (l =
                                    (c = (d = (p = g)[x] || (p[x] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[t] ||
                                    [])[0] === T && l[1]) && l[2],
                                p = f && g.childNodes[f];
                              (p = (++f && p && p[m]) || (b = f = 0) || h.pop());

                            )
                              if (p.nodeType === 1 && ++b && p === e) {
                                c[t] = [T, f, b];
                                break;
                              }
                          } else if (
                            (y &&
                              (b = f =
                                (l =
                                  (c = (d = (p = e)[x] || (p[x] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[t] ||
                                  [])[0] === T && l[1]),
                            !1 === b)
                          )
                            for (
                              ;
                              (p = (++f && p && p[m]) || (b = f = 0) || h.pop()) &&
                              ((s ? p.nodeName.toLowerCase() !== v : p.nodeType !== 1) ||
                                !++b ||
                                (y && ((c = (d = p[x] || (p[x] = {}))[p.uniqueID] || (d[p.uniqueID] = {}))[t] = [T, b]),
                                p !== e));

                            );
                          return (b -= r) === o || (b % o == 0 && b / o >= 0);
                        }
                      };
                },
                PSEUDO(t, e) {
                  let n;
                  const r = o.pseudos[t] || o.setFilters[t.toLowerCase()] || st.error(`unsupported pseudo: ${t}`);
                  return r[x]
                    ? r(e)
                    : r.length > 1
                    ? ((n = [t, t, '', e]),
                      o.setFilters.hasOwnProperty(t.toLowerCase())
                        ? lt(function (t, n) {
                            for (var o, i = r(t, e), a = i.length; a--; ) t[(o = L(t, i[a]))] = !(n[o] = i[a]);
                          })
                        : function (t) {
                            return r(t, 0, n);
                          })
                    : r;
                },
              },
              pseudos: {
                not: lt(function (t) {
                  const e = [];
                  const n = [];
                  const o = s(t.replace(P, '$1'));
                  return o[x]
                    ? lt(function (t, e, n, r) {
                        for (var i, a = o(t, null, r, []), s = t.length; s--; ) (i = a[s]) && (t[s] = !(e[s] = i));
                      })
                    : function (t, r, i) {
                        return (e[0] = t), o(e, null, i, n), (e[0] = null), !n.pop();
                      };
                }),
                has: lt(function (t) {
                  return function (e) {
                    return st(t, e).length > 0;
                  };
                }),
                contains: lt(function (t) {
                  return (
                    (t = t.replace(et, nt)),
                    function (e) {
                      return (e.textContent || r(e)).indexOf(t) > -1;
                    }
                  );
                }),
                lang: lt(function (t) {
                  return (
                    X.test(t || '') || st.error(`unsupported lang: ${t}`),
                    (t = t.replace(et, nt).toLowerCase()),
                    function (e) {
                      let n;
                      do {
                        if ((n = m ? e.lang : e.getAttribute('xml:lang') || e.getAttribute('lang')))
                          return (n = n.toLowerCase()) === t || n.indexOf(`${t}-`) === 0;
                      } while ((e = e.parentNode) && e.nodeType === 1);
                      return !1;
                    }
                  );
                }),
                target(e) {
                  const n = t.location && t.location.hash;
                  return n && n.slice(1) === e.id;
                },
                root(t) {
                  return t === h;
                },
                focus(t) {
                  return t === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(t.type || t.href || ~t.tabIndex);
                },
                enabled: mt(!1),
                disabled: mt(!0),
                checked(t) {
                  const e = t.nodeName.toLowerCase();
                  return (e === 'input' && !!t.checked) || (e === 'option' && !!t.selected);
                },
                selected(t) {
                  return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected;
                },
                empty(t) {
                  for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
                  return !0;
                },
                parent(t) {
                  return !o.pseudos.empty(t);
                },
                header(t) {
                  return Q.test(t.nodeName);
                },
                input(t) {
                  return Y.test(t.nodeName);
                },
                button(t) {
                  const e = t.nodeName.toLowerCase();
                  return (e === 'input' && t.type === 'button') || e === 'button';
                },
                text(t) {
                  let e;
                  return (
                    t.nodeName.toLowerCase() === 'input' &&
                    t.type === 'text' &&
                    ((e = t.getAttribute('type')) == null || e.toLowerCase() === 'text')
                  );
                },
                first: gt(function () {
                  return [0];
                }),
                last: gt(function (t, e) {
                  return [e - 1];
                }),
                eq: gt(function (t, e, n) {
                  return [n < 0 ? n + e : n];
                }),
                even: gt(function (t, e) {
                  for (let n = 0; n < e; n += 2) t.push(n);
                  return t;
                }),
                odd: gt(function (t, e) {
                  for (let n = 1; n < e; n += 2) t.push(n);
                  return t;
                }),
                lt: gt(function (t, e, n) {
                  for (let o = n < 0 ? n + e : n > e ? e : n; --o >= 0; ) t.push(o);
                  return t;
                }),
                gt: gt(function (t, e, n) {
                  for (let o = n < 0 ? n + e : n; ++o < e; ) t.push(o);
                  return t;
                }),
              },
            }),
          (o.pseudos.nth = o.pseudos.eq),
          { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
            o.pseudos[e] = ft(e);
          for (e in { submit: !0, reset: !0 }) o.pseudos[e] = ht(e);
          function yt() {}
          function bt(t) {
            for (var e = 0, n = t.length, o = ''; e < n; e++) o += t[e].value;
            return o;
          }
          function xt(t, e, n) {
            const o = e.dir;
            const r = e.next;
            const i = r || o;
            const a = n && i === 'parentNode';
            const s = k++;
            return e.first
              ? function (e, n, r) {
                  for (; (e = e[o]); ) if (e.nodeType === 1 || a) return t(e, n, r);
                  return !1;
                }
              : function (e, n, u) {
                  let l;
                  let c;
                  let d;
                  const p = [T, s];
                  if (u) {
                    for (; (e = e[o]); ) if ((e.nodeType === 1 || a) && t(e, n, u)) return !0;
                  } else
                    for (; (e = e[o]); )
                      if (e.nodeType === 1 || a)
                        if (
                          ((c = (d = e[x] || (e[x] = {}))[e.uniqueID] || (d[e.uniqueID] = {})),
                          r && r === e.nodeName.toLowerCase())
                        )
                          e = e[o] || e;
                        else {
                          if ((l = c[i]) && l[0] === T && l[1] === s) return (p[2] = l[2]);
                          if (((c[i] = p), (p[2] = t(e, n, u)))) return !0;
                        }
                  return !1;
                };
          }
          function wt(t) {
            return t.length > 1
              ? function (e, n, o) {
                  for (let r = t.length; r--; ) if (!t[r](e, n, o)) return !1;
                  return !0;
                }
              : t[0];
          }
          function Tt(t, e, n, o, r) {
            for (var i, a = [], s = 0, u = t.length, l = e != null; s < u; s++)
              (i = t[s]) && ((n && !n(i, o, r)) || (a.push(i), l && e.push(s)));
            return a;
          }
          function kt(t, e, n, o, r, i) {
            return (
              o && !o[x] && (o = kt(o)),
              r && !r[x] && (r = kt(r, i)),
              lt(function (i, a, s, u) {
                let l;
                let c;
                let d;
                const p = [];
                const f = [];
                const h = a.length;
                const m =
                  i ||
                  (function (t, e, n) {
                    for (let o = 0, r = e.length; o < r; o++) st(t, e[o], n);
                    return n;
                  })(e || '*', s.nodeType ? [s] : s, []);
                const g = !t || (!i && e) ? m : Tt(m, p, t, s, u);
                let v = n ? (r || (i ? t : h || o) ? [] : a) : g;
                if ((n && n(g, v, s, u), o))
                  for (l = Tt(v, f), o(l, [], s, u), c = l.length; c--; ) (d = l[c]) && (v[f[c]] = !(g[f[c]] = d));
                if (i) {
                  if (r || t) {
                    if (r) {
                      for (l = [], c = v.length; c--; ) (d = v[c]) && l.push((g[c] = d));
                      r(null, (v = []), l, u);
                    }
                    for (c = v.length; c--; ) (d = v[c]) && (l = r ? L(i, d) : p[c]) > -1 && (i[l] = !(a[l] = d));
                  }
                } else (v = Tt(v === a ? v.splice(h, v.length) : v)), r ? r(null, a, v, u) : N.apply(a, v);
              })
            );
          }
          function Ct(t) {
            for (
              var e,
                n,
                r,
                i = t.length,
                a = o.relative[t[0].type],
                s = a || o.relative[' '],
                u = a ? 1 : 0,
                c = xt(
                  function (t) {
                    return t === e;
                  },
                  s,
                  !0,
                ),
                d = xt(
                  function (t) {
                    return L(e, t) > -1;
                  },
                  s,
                  !0,
                ),
                p = [
                  function (t, n, o) {
                    const r = (!a && (o || n !== l)) || ((e = n).nodeType ? c(t, n, o) : d(t, n, o));
                    return (e = null), r;
                  },
                ];
              u < i;
              u++
            )
              if ((n = o.relative[t[u].type])) p = [xt(wt(p), n)];
              else {
                if ((n = o.filter[t[u].type].apply(null, t[u].matches))[x]) {
                  for (r = ++u; r < i && !o.relative[t[r].type]; r++);
                  return kt(
                    u > 1 && wt(p),
                    u > 1 && bt(t.slice(0, u - 1).concat({ value: t[u - 2].type === ' ' ? '*' : '' })).replace(P, '$1'),
                    n,
                    u < r && Ct(t.slice(u, r)),
                    r < i && Ct((t = t.slice(r))),
                    r < i && bt(t),
                  );
                }
                p.push(n);
              }
            return wt(p);
          }
          return (
            (yt.prototype = o.filters = o.pseudos),
            (o.setFilters = new yt()),
            (a = st.tokenize =
              function (t, e) {
                let n;
                let r;
                let i;
                let a;
                let s;
                let u;
                let l;
                const c = j[`${t} `];
                if (c) return e ? 0 : c.slice(0);
                for (s = t, u = [], l = o.preFilter; s; ) {
                  for (a in ((n && !(r = W.exec(s))) || (r && (s = s.slice(r[0].length) || s), u.push((i = []))),
                  (n = !1),
                  (r = z.exec(s)) &&
                    ((n = r.shift()), i.push({ value: n, type: r[0].replace(P, ' ') }), (s = s.slice(n.length))),
                  o.filter))
                    !(r = G[a].exec(s)) ||
                      (l[a] && !(r = l[a](r))) ||
                      ((n = r.shift()), i.push({ value: n, type: a, matches: r }), (s = s.slice(n.length)));
                  if (!n) break;
                }
                return e ? s.length : s ? st.error(t) : j(t, u).slice(0);
              }),
            (s = st.compile =
              function (t, e) {
                let n;
                const r = [];
                const i = [];
                let s = S[`${t} `];
                if (!s) {
                  for (e || (e = a(t)), n = e.length; n--; ) (s = Ct(e[n]))[x] ? r.push(s) : i.push(s);
                  (s = S(
                    t,
                    (function (t, e) {
                      const n = e.length > 0;
                      const r = t.length > 0;
                      const i = function (i, a, s, u, c) {
                        let d;
                        let h;
                        let g;
                        let v = 0;
                        let y = '0';
                        const b = i && [];
                        let x = [];
                        const w = l;
                        const k = i || (r && o.find.TAG('*', c));
                        const C = (T += w == null ? 1 : Math.random() || 0.1);
                        const j = k.length;
                        for (c && (l = a == f || a || c); y !== j && (d = k[y]) != null; y++) {
                          if (r && d) {
                            for (h = 0, a || d.ownerDocument == f || (p(d), (s = !m)); (g = t[h++]); )
                              if (g(d, a || f, s)) {
                                u.push(d);
                                break;
                              }
                            c && (T = C);
                          }
                          n && ((d = !g && d) && v--, i && b.push(d));
                        }
                        if (((v += y), n && y !== v)) {
                          for (h = 0; (g = e[h++]); ) g(b, x, a, s);
                          if (i) {
                            if (v > 0) for (; y--; ) b[y] || x[y] || (x[y] = D.call(u));
                            x = Tt(x);
                          }
                          N.apply(u, x), c && !i && x.length > 0 && v + e.length > 1 && st.uniqueSort(u);
                        }
                        return c && ((T = C), (l = w)), b;
                      };
                      return n ? lt(i) : i;
                    })(i, r),
                  )),
                    (s.selector = t);
                }
                return s;
              }),
            (u = st.select =
              function (t, e, n, r) {
                let i;
                let u;
                let l;
                let c;
                let d;
                const p = typeof t === 'function' && t;
                const f = !r && a((t = p.selector || t));
                if (((n = n || []), f.length === 1)) {
                  if (
                    (u = f[0] = f[0].slice(0)).length > 2 &&
                    (l = u[0]).type === 'ID' &&
                    e.nodeType === 9 &&
                    m &&
                    o.relative[u[1].type]
                  ) {
                    if (!(e = (o.find.ID(l.matches[0].replace(et, nt), e) || [])[0])) return n;
                    p && (e = e.parentNode), (t = t.slice(u.shift().value.length));
                  }
                  for (i = G.needsContext.test(t) ? 0 : u.length; i-- && ((l = u[i]), !o.relative[(c = l.type)]); )
                    if (
                      (d = o.find[c]) &&
                      (r = d(l.matches[0].replace(et, nt), (tt.test(u[0].type) && vt(e.parentNode)) || e))
                    ) {
                      if ((u.splice(i, 1), !(t = r.length && bt(u)))) return N.apply(n, r), n;
                      break;
                    }
                }
                return (p || s(t, f))(r, e, !m, n, !e || (tt.test(t) && vt(e.parentNode)) || e), n;
              }),
            (n.sortStable = x.split('').sort(E).join('') === x),
            (n.detectDuplicates = !!d),
            p(),
            (n.sortDetached = ct(function (t) {
              return 1 & t.compareDocumentPosition(f.createElement('fieldset'));
            })),
            ct(function (t) {
              return (t.innerHTML = "<a href='#'></a>"), t.firstChild.getAttribute('href') === '#';
            }) ||
              dt('type|href|height|width', function (t, e, n) {
                if (!n) return t.getAttribute(e, e.toLowerCase() === 'type' ? 1 : 2);
              }),
            (n.attributes &&
              ct(function (t) {
                return (
                  (t.innerHTML = '<input/>'),
                  t.firstChild.setAttribute('value', ''),
                  t.firstChild.getAttribute('value') === ''
                );
              })) ||
              dt('value', function (t, e, n) {
                if (!n && t.nodeName.toLowerCase() === 'input') return t.defaultValue;
              }),
            ct(function (t) {
              return t.getAttribute('disabled') == null;
            }) ||
              dt(F, function (t, e, n) {
                let o;
                if (!n)
                  return !0 === t[e] ? e.toLowerCase() : (o = t.getAttributeNode(e)) && o.specified ? o.value : null;
              }),
            st
          );
        })(o);
        (C.find = S),
          (C.expr = S.selectors),
          (C.expr[':'] = C.expr.pseudos),
          (C.uniqueSort = C.unique = S.uniqueSort),
          (C.text = S.getText),
          (C.isXMLDoc = S.isXML),
          (C.contains = S.contains),
          (C.escapeSelector = S.escape);
        const A = function (t, e, n) {
          for (var o = [], r = void 0 !== n; (t = t[e]) && t.nodeType !== 9; )
            if (t.nodeType === 1) {
              if (r && C(t).is(n)) break;
              o.push(t);
            }
          return o;
        };
        const E = function (t, e) {
          for (var n = []; t; t = t.nextSibling) t.nodeType === 1 && t !== e && n.push(t);
          return n;
        };
        const _ = C.expr.match.needsContext;
        function B(t, e) {
          return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
        }
        const D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function M(t, e, n) {
          return v(e)
            ? C.grep(t, function (t, o) {
                return !!e.call(t, o, t) !== n;
              })
            : e.nodeType
            ? C.grep(t, function (t) {
                return (t === e) !== n;
              })
            : typeof e !== 'string'
            ? C.grep(t, function (t) {
                return c.call(e, t) > -1 !== n;
              })
            : C.filter(e, t, n);
        }
        (C.filter = function (t, e, n) {
          const o = e[0];
          return (
            n && (t = `:not(${t})`),
            e.length === 1 && o.nodeType === 1
              ? C.find.matchesSelector(o, t)
                ? [o]
                : []
              : C.find.matches(
                  t,
                  C.grep(e, function (t) {
                    return t.nodeType === 1;
                  }),
                )
          );
        }),
          C.fn.extend({
            find(t) {
              let e;
              let n;
              const o = this.length;
              const r = this;
              if (typeof t !== 'string')
                return this.pushStack(
                  C(t).filter(function () {
                    for (e = 0; e < o; e++) if (C.contains(r[e], this)) return !0;
                  }),
                );
              for (n = this.pushStack([]), e = 0; e < o; e++) C.find(t, r[e], n);
              return o > 1 ? C.uniqueSort(n) : n;
            },
            filter(t) {
              return this.pushStack(M(this, t || [], !1));
            },
            not(t) {
              return this.pushStack(M(this, t || [], !0));
            },
            is(t) {
              return !!M(this, typeof t === 'string' && _.test(t) ? C(t) : t || [], !1).length;
            },
          });
        let N;
        const $ = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        ((C.fn.init = function (t, e, n) {
          let o;
          let r;
          if (!t) return this;
          if (((n = n || N), typeof t === 'string')) {
            if (
              !(o = t[0] === '<' && t[t.length - 1] === '>' && t.length >= 3 ? [null, t, null] : $.exec(t)) ||
              (!o[1] && e)
            )
              return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
            if (o[1]) {
              if (
                ((e = e instanceof C ? e[0] : e),
                C.merge(this, C.parseHTML(o[1], e && e.nodeType ? e.ownerDocument || e : b, !0)),
                D.test(o[1]) && C.isPlainObject(e))
              )
                for (o in e) v(this[o]) ? this[o](e[o]) : this.attr(o, e[o]);
              return this;
            }
            return (r = b.getElementById(o[2])) && ((this[0] = r), (this.length = 1)), this;
          }
          return t.nodeType
            ? ((this[0] = t), (this.length = 1), this)
            : v(t)
            ? void 0 !== n.ready
              ? n.ready(t)
              : t(C)
            : C.makeArray(t, this);
        }).prototype = C.fn),
          (N = C(b));
        const L = /^(?:parents|prev(?:Until|All))/;
        const F = { children: !0, contents: !0, next: !0, prev: !0 };
        function q(t, e) {
          for (; (t = t[e]) && t.nodeType !== 1; );
          return t;
        }
        C.fn.extend({
          has(t) {
            const e = C(t, this);
            const n = e.length;
            return this.filter(function () {
              for (let t = 0; t < n; t++) if (C.contains(this, e[t])) return !0;
            });
          },
          closest(t, e) {
            let n;
            let o = 0;
            const r = this.length;
            const i = [];
            const a = typeof t !== 'string' && C(t);
            if (!_.test(t))
              for (; o < r; o++)
                for (n = this[o]; n && n !== e; n = n.parentNode)
                  if (n.nodeType < 11 && (a ? a.index(n) > -1 : n.nodeType === 1 && C.find.matchesSelector(n, t))) {
                    i.push(n);
                    break;
                  }
            return this.pushStack(i.length > 1 ? C.uniqueSort(i) : i);
          },
          index(t) {
            return t
              ? typeof t === 'string'
                ? c.call(C(t), this[0])
                : c.call(this, t.jquery ? t[0] : t)
              : this[0] && this[0].parentNode
              ? this.first().prevAll().length
              : -1;
          },
          add(t, e) {
            return this.pushStack(C.uniqueSort(C.merge(this.get(), C(t, e))));
          },
          addBack(t) {
            return this.add(t == null ? this.prevObject : this.prevObject.filter(t));
          },
        }),
          C.each(
            {
              parent(t) {
                const e = t.parentNode;
                return e && e.nodeType !== 11 ? e : null;
              },
              parents(t) {
                return A(t, 'parentNode');
              },
              parentsUntil(t, e, n) {
                return A(t, 'parentNode', n);
              },
              next(t) {
                return q(t, 'nextSibling');
              },
              prev(t) {
                return q(t, 'previousSibling');
              },
              nextAll(t) {
                return A(t, 'nextSibling');
              },
              prevAll(t) {
                return A(t, 'previousSibling');
              },
              nextUntil(t, e, n) {
                return A(t, 'nextSibling', n);
              },
              prevUntil(t, e, n) {
                return A(t, 'previousSibling', n);
              },
              siblings(t) {
                return E((t.parentNode || {}).firstChild, t);
              },
              children(t) {
                return E(t.firstChild);
              },
              contents(t) {
                return t.contentDocument != null && a(t.contentDocument)
                  ? t.contentDocument
                  : (B(t, 'template') && (t = t.content || t), C.merge([], t.childNodes));
              },
            },
            function (t, e) {
              C.fn[t] = function (n, o) {
                let r = C.map(this, e, n);
                return (
                  t.slice(-5) !== 'Until' && (o = n),
                  o && typeof o === 'string' && (r = C.filter(o, r)),
                  this.length > 1 && (F[t] || C.uniqueSort(r), L.test(t) && r.reverse()),
                  this.pushStack(r)
                );
              };
            },
          );
        const H = /[^\x20\t\r\n\f]+/g;
        function R(t) {
          return t;
        }
        function I(t) {
          throw t;
        }
        function O(t, e, n, o) {
          let r;
          try {
            t && v((r = t.promise))
              ? r.call(t).done(e).fail(n)
              : t && v((r = t.then))
              ? r.call(t, e, n)
              : e.apply(void 0, [t].slice(o));
          } catch (t) {
            n.apply(void 0, [t]);
          }
        }
        (C.Callbacks = function (t) {
          t =
            typeof t === 'string'
              ? (function (t) {
                  const e = {};
                  return (
                    C.each(t.match(H) || [], function (t, n) {
                      e[n] = !0;
                    }),
                    e
                  );
                })(t)
              : C.extend({}, t);
          let e;
          let n;
          let o;
          let r;
          let i = [];
          let a = [];
          let s = -1;
          const u = function () {
            for (r = r || t.once, o = e = !0; a.length; s = -1)
              for (n = a.shift(); ++s < i.length; )
                !1 === i[s].apply(n[0], n[1]) && t.stopOnFalse && ((s = i.length), (n = !1));
            t.memory || (n = !1), (e = !1), r && (i = n ? [] : '');
          };
          var l = {
            add() {
              return (
                i &&
                  (n && !e && ((s = i.length - 1), a.push(n)),
                  (function e(n) {
                    C.each(n, function (n, o) {
                      v(o) ? (t.unique && l.has(o)) || i.push(o) : o && o.length && T(o) !== 'string' && e(o);
                    });
                  })(arguments),
                  n && !e && u()),
                this
              );
            },
            remove() {
              return (
                C.each(arguments, function (t, e) {
                  for (var n; (n = C.inArray(e, i, n)) > -1; ) i.splice(n, 1), n <= s && s--;
                }),
                this
              );
            },
            has(t) {
              return t ? C.inArray(t, i) > -1 : i.length > 0;
            },
            empty() {
              return i && (i = []), this;
            },
            disable() {
              return (r = a = []), (i = n = ''), this;
            },
            disabled() {
              return !i;
            },
            lock() {
              return (r = a = []), n || e || (i = n = ''), this;
            },
            locked() {
              return !!r;
            },
            fireWith(t, n) {
              return r || ((n = [t, (n = n || []).slice ? n.slice() : n]), a.push(n), e || u()), this;
            },
            fire() {
              return l.fireWith(this, arguments), this;
            },
            fired() {
              return !!o;
            },
          };
          return l;
        }),
          C.extend({
            Deferred(t) {
              const e = [
                ['notify', 'progress', C.Callbacks('memory'), C.Callbacks('memory'), 2],
                ['resolve', 'done', C.Callbacks('once memory'), C.Callbacks('once memory'), 0, 'resolved'],
                ['reject', 'fail', C.Callbacks('once memory'), C.Callbacks('once memory'), 1, 'rejected'],
              ];
              let n = 'pending';
              var r = {
                state() {
                  return n;
                },
                always() {
                  return i.done(arguments).fail(arguments), this;
                },
                catch(t) {
                  return r.then(null, t);
                },
                pipe() {
                  let t = arguments;
                  return C.Deferred(function (n) {
                    C.each(e, function (e, o) {
                      const r = v(t[o[4]]) && t[o[4]];
                      i[o[1]](function () {
                        const t = r && r.apply(this, arguments);
                        t && v(t.promise)
                          ? t.promise().progress(n.notify).done(n.resolve).fail(n.reject)
                          : n[`${o[0]}With`](this, r ? [t] : arguments);
                      });
                    }),
                      (t = null);
                  }).promise();
                },
                then(t, n, r) {
                  let i = 0;
                  function a(t, e, n, r) {
                    return function () {
                      let s = this;
                      let u = arguments;
                      const l = function () {
                        let o;
                        let l;
                        if (!(t < i)) {
                          if ((o = n.apply(s, u)) === e.promise()) throw new TypeError('Thenable self-resolution');
                          (l = o && (typeof o === 'object' || typeof o === 'function') && o.then),
                            v(l)
                              ? r
                                ? l.call(o, a(i, e, R, r), a(i, e, I, r))
                                : (i++, l.call(o, a(i, e, R, r), a(i, e, I, r), a(i, e, R, e.notifyWith)))
                              : (n !== R && ((s = void 0), (u = [o])), (r || e.resolveWith)(s, u));
                        }
                      };
                      var c = r
                        ? l
                        : function () {
                            try {
                              l();
                            } catch (o) {
                              C.Deferred.exceptionHook && C.Deferred.exceptionHook(o, c.stackTrace),
                                t + 1 >= i && (n !== I && ((s = void 0), (u = [o])), e.rejectWith(s, u));
                            }
                          };
                      t
                        ? c()
                        : (C.Deferred.getStackHook && (c.stackTrace = C.Deferred.getStackHook()), o.setTimeout(c));
                    };
                  }
                  return C.Deferred(function (o) {
                    e[0][3].add(a(0, o, v(r) ? r : R, o.notifyWith)),
                      e[1][3].add(a(0, o, v(t) ? t : R)),
                      e[2][3].add(a(0, o, v(n) ? n : I));
                  }).promise();
                },
                promise(t) {
                  return t != null ? C.extend(t, r) : r;
                },
              };
              var i = {};
              return (
                C.each(e, function (t, o) {
                  const a = o[2];
                  const s = o[5];
                  (r[o[1]] = a.add),
                    s &&
                      a.add(
                        function () {
                          n = s;
                        },
                        e[3 - t][2].disable,
                        e[3 - t][3].disable,
                        e[0][2].lock,
                        e[0][3].lock,
                      ),
                    a.add(o[3].fire),
                    (i[o[0]] = function () {
                      return i[`${o[0]}With`](this === i ? void 0 : this, arguments), this;
                    }),
                    (i[`${o[0]}With`] = a.fireWith);
                }),
                r.promise(i),
                t && t.call(i, i),
                i
              );
            },
            when(t) {
              let e = arguments.length;
              let n = e;
              const o = Array(n);
              const r = s.call(arguments);
              const i = C.Deferred();
              const a = function (t) {
                return function (n) {
                  (o[t] = this), (r[t] = arguments.length > 1 ? s.call(arguments) : n), --e || i.resolveWith(o, r);
                };
              };
              if (e <= 1 && (O(t, i.done(a(n)).resolve, i.reject, !e), i.state() === 'pending' || v(r[n] && r[n].then)))
                return i.then();
              for (; n--; ) O(r[n], a(n), i.reject);
              return i.promise();
            },
          });
        const P = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        (C.Deferred.exceptionHook = function (t, e) {
          o.console &&
            o.console.warn &&
            t &&
            P.test(t.name) &&
            o.console.warn(`jQuery.Deferred exception: ${t.message}`, t.stack, e);
        }),
          (C.readyException = function (t) {
            o.setTimeout(function () {
              throw t;
            });
          });
        const W = C.Deferred();
        function z() {
          b.removeEventListener('DOMContentLoaded', z), o.removeEventListener('load', z), C.ready();
        }
        (C.fn.ready = function (t) {
          return (
            W.then(t).catch(function (t) {
              C.readyException(t);
            }),
            this
          );
        }),
          C.extend({
            isReady: !1,
            readyWait: 1,
            ready(t) {
              (!0 === t ? --C.readyWait : C.isReady) ||
                ((C.isReady = !0), (!0 !== t && --C.readyWait > 0) || W.resolveWith(b, [C]));
            },
          }),
          (C.ready.then = W.then),
          b.readyState === 'complete' || (b.readyState !== 'loading' && !b.documentElement.doScroll)
            ? o.setTimeout(C.ready)
            : (b.addEventListener('DOMContentLoaded', z), o.addEventListener('load', z));
        const U = function (t, e, n, o, r, i, a) {
          let s = 0;
          const u = t.length;
          let l = n == null;
          if (T(n) === 'object') for (s in ((r = !0), n)) U(t, e, s, n[s], !0, i, a);
          else if (
            void 0 !== o &&
            ((r = !0),
            v(o) || (a = !0),
            l &&
              (a
                ? (e.call(t, o), (e = null))
                : ((l = e),
                  (e = function (t, e, n) {
                    return l.call(C(t), n);
                  }))),
            e)
          )
            for (; s < u; s++) e(t[s], n, a ? o : o.call(t[s], s, e(t[s], n)));
          return r ? t : l ? e.call(t) : u ? e(t[0], n) : i;
        };
        const V = /^-ms-/;
        const X = /-([a-z])/g;
        function G(t, e) {
          return e.toUpperCase();
        }
        function K(t) {
          return t.replace(V, 'ms-').replace(X, G);
        }
        const Y = function (t) {
          return t.nodeType === 1 || t.nodeType === 9 || !+t.nodeType;
        };
        function Q() {
          this.expando = C.expando + Q.uid++;
        }
        (Q.uid = 1),
          (Q.prototype = {
            cache(t) {
              let e = t[this.expando];
              return (
                e ||
                  ((e = {}),
                  Y(t) &&
                    (t.nodeType
                      ? (t[this.expando] = e)
                      : Object.defineProperty(t, this.expando, { value: e, configurable: !0 }))),
                e
              );
            },
            set(t, e, n) {
              let o;
              const r = this.cache(t);
              if (typeof e === 'string') r[K(e)] = n;
              else for (o in e) r[K(o)] = e[o];
              return r;
            },
            get(t, e) {
              return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][K(e)];
            },
            access(t, e, n) {
              return void 0 === e || (e && typeof e === 'string' && void 0 === n)
                ? this.get(t, e)
                : (this.set(t, e, n), void 0 !== n ? n : e);
            },
            remove(t, e) {
              let n;
              const o = t[this.expando];
              if (void 0 !== o) {
                if (void 0 !== e) {
                  n = (e = Array.isArray(e) ? e.map(K) : (e = K(e)) in o ? [e] : e.match(H) || []).length;
                  for (; n--; ) delete o[e[n]];
                }
                (void 0 === e || C.isEmptyObject(o)) &&
                  (t.nodeType ? (t[this.expando] = void 0) : delete t[this.expando]);
              }
            },
            hasData(t) {
              const e = t[this.expando];
              return void 0 !== e && !C.isEmptyObject(e);
            },
          });
        const J = new Q();
        const Z = new Q();
        const tt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
        const et = /[A-Z]/g;
        function nt(t, e, n) {
          let o;
          if (void 0 === n && t.nodeType === 1)
            if (((o = `data-${e.replace(et, '-$&').toLowerCase()}`), typeof (n = t.getAttribute(o)) === 'string')) {
              try {
                n = (function (t) {
                  return (
                    t === 'true' ||
                    (t !== 'false' && (t === 'null' ? null : t === `${+t}` ? +t : tt.test(t) ? JSON.parse(t) : t))
                  );
                })(n);
              } catch (t) {}
              Z.set(t, e, n);
            } else n = void 0;
          return n;
        }
        C.extend({
          hasData(t) {
            return Z.hasData(t) || J.hasData(t);
          },
          data(t, e, n) {
            return Z.access(t, e, n);
          },
          removeData(t, e) {
            Z.remove(t, e);
          },
          _data(t, e, n) {
            return J.access(t, e, n);
          },
          _removeData(t, e) {
            J.remove(t, e);
          },
        }),
          C.fn.extend({
            data(t, e) {
              let n;
              let o;
              let r;
              const i = this[0];
              const a = i && i.attributes;
              if (void 0 === t) {
                if (this.length && ((r = Z.get(i)), i.nodeType === 1 && !J.get(i, 'hasDataAttrs'))) {
                  for (n = a.length; n--; )
                    a[n] && (o = a[n].name).indexOf('data-') === 0 && ((o = K(o.slice(5))), nt(i, o, r[o]));
                  J.set(i, 'hasDataAttrs', !0);
                }
                return r;
              }
              return typeof t === 'object'
                ? this.each(function () {
                    Z.set(this, t);
                  })
                : U(
                    this,
                    function (e) {
                      let n;
                      if (i && void 0 === e)
                        return void 0 !== (n = Z.get(i, t)) || void 0 !== (n = nt(i, t)) ? n : void 0;
                      this.each(function () {
                        Z.set(this, t, e);
                      });
                    },
                    null,
                    e,
                    arguments.length > 1,
                    null,
                    !0,
                  );
            },
            removeData(t) {
              return this.each(function () {
                Z.remove(this, t);
              });
            },
          }),
          C.extend({
            queue(t, e, n) {
              let o;
              if (t)
                return (
                  (e = `${e || 'fx'}queue`),
                  (o = J.get(t, e)),
                  n && (!o || Array.isArray(n) ? (o = J.access(t, e, C.makeArray(n))) : o.push(n)),
                  o || []
                );
            },
            dequeue(t, e) {
              e = e || 'fx';
              const n = C.queue(t, e);
              let o = n.length;
              let r = n.shift();
              const i = C._queueHooks(t, e);
              r === 'inprogress' && ((r = n.shift()), o--),
                r &&
                  (e === 'fx' && n.unshift('inprogress'),
                  delete i.stop,
                  r.call(
                    t,
                    function () {
                      C.dequeue(t, e);
                    },
                    i,
                  )),
                !o && i && i.empty.fire();
            },
            _queueHooks(t, e) {
              const n = `${e}queueHooks`;
              return (
                J.get(t, n) ||
                J.access(t, n, {
                  empty: C.Callbacks('once memory').add(function () {
                    J.remove(t, [`${e}queue`, n]);
                  }),
                })
              );
            },
          }),
          C.fn.extend({
            queue(t, e) {
              let n = 2;
              return (
                typeof t !== 'string' && ((e = t), (t = 'fx'), n--),
                arguments.length < n
                  ? C.queue(this[0], t)
                  : void 0 === e
                  ? this
                  : this.each(function () {
                      const n = C.queue(this, t, e);
                      C._queueHooks(this, t), t === 'fx' && n[0] !== 'inprogress' && C.dequeue(this, t);
                    })
              );
            },
            dequeue(t) {
              return this.each(function () {
                C.dequeue(this, t);
              });
            },
            clearQueue(t) {
              return this.queue(t || 'fx', []);
            },
            promise(t, e) {
              let n;
              let o = 1;
              const r = C.Deferred();
              const i = this;
              let a = this.length;
              const s = function () {
                --o || r.resolveWith(i, [i]);
              };
              for (typeof t !== 'string' && ((e = t), (t = void 0)), t = t || 'fx'; a--; )
                (n = J.get(i[a], `${t}queueHooks`)) && n.empty && (o++, n.empty.add(s));
              return s(), r.promise(e);
            },
          });
        const ot = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
        const rt = new RegExp(`^(?:([+-])=|)(${ot})([a-z%]*)$`, 'i');
        const it = ['Top', 'Right', 'Bottom', 'Left'];
        const at = b.documentElement;
        let st = function (t) {
          return C.contains(t.ownerDocument, t);
        };
        const ut = { composed: !0 };
        at.getRootNode &&
          (st = function (t) {
            return C.contains(t.ownerDocument, t) || t.getRootNode(ut) === t.ownerDocument;
          });
        const lt = function (t, e) {
          return (
            (t = e || t).style.display === 'none' || (t.style.display === '' && st(t) && C.css(t, 'display') === 'none')
          );
        };
        function ct(t, e, n, o) {
          let r;
          let i;
          let a = 20;
          const s = o
            ? function () {
                return o.cur();
              }
            : function () {
                return C.css(t, e, '');
              };
          let u = s();
          let l = (n && n[3]) || (C.cssNumber[e] ? '' : 'px');
          let c = t.nodeType && (C.cssNumber[e] || (l !== 'px' && +u)) && rt.exec(C.css(t, e));
          if (c && c[3] !== l) {
            for (u /= 2, l = l || c[3], c = +u || 1; a--; )
              C.style(t, e, c + l), (1 - i) * (1 - (i = s() / u || 0.5)) <= 0 && (a = 0), (c /= i);
            (c *= 2), C.style(t, e, c + l), (n = n || []);
          }
          return (
            n &&
              ((c = +c || +u || 0),
              (r = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
              o && ((o.unit = l), (o.start = c), (o.end = r))),
            r
          );
        }
        const dt = {};
        function pt(t) {
          let e;
          const n = t.ownerDocument;
          const o = t.nodeName;
          let r = dt[o];
          return (
            r ||
            ((e = n.body.appendChild(n.createElement(o))),
            (r = C.css(e, 'display')),
            e.parentNode.removeChild(e),
            r === 'none' && (r = 'block'),
            (dt[o] = r),
            r)
          );
        }
        function ft(t, e) {
          for (var n, o, r = [], i = 0, a = t.length; i < a; i++)
            (o = t[i]).style &&
              ((n = o.style.display),
              e
                ? (n === 'none' && ((r[i] = J.get(o, 'display') || null), r[i] || (o.style.display = '')),
                  o.style.display === '' && lt(o) && (r[i] = pt(o)))
                : n !== 'none' && ((r[i] = 'none'), J.set(o, 'display', n)));
          for (i = 0; i < a; i++) r[i] != null && (t[i].style.display = r[i]);
          return t;
        }
        C.fn.extend({
          show() {
            return ft(this, !0);
          },
          hide() {
            return ft(this);
          },
          toggle(t) {
            return typeof t === 'boolean'
              ? t
                ? this.show()
                : this.hide()
              : this.each(function () {
                  lt(this) ? C(this).show() : C(this).hide();
                });
          },
        });
        let ht;
        let mt;
        const gt = /^(?:checkbox|radio)$/i;
        const vt = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        const yt = /^$|^module$|\/(?:java|ecma)script/i;
        (ht = b.createDocumentFragment().appendChild(b.createElement('div'))),
          (mt = b.createElement('input')).setAttribute('type', 'radio'),
          mt.setAttribute('checked', 'checked'),
          mt.setAttribute('name', 't'),
          ht.appendChild(mt),
          (g.checkClone = ht.cloneNode(!0).cloneNode(!0).lastChild.checked),
          (ht.innerHTML = '<textarea>x</textarea>'),
          (g.noCloneChecked = !!ht.cloneNode(!0).lastChild.defaultValue),
          (ht.innerHTML = '<option></option>'),
          (g.option = !!ht.lastChild);
        const bt = {
          thead: [1, '<table>', '</table>'],
          col: [2, '<table><colgroup>', '</colgroup></table>'],
          tr: [2, '<table><tbody>', '</tbody></table>'],
          td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
          _default: [0, '', ''],
        };
        function xt(t, e) {
          let n;
          return (
            (n =
              void 0 !== t.getElementsByTagName
                ? t.getElementsByTagName(e || '*')
                : void 0 !== t.querySelectorAll
                ? t.querySelectorAll(e || '*')
                : []),
            void 0 === e || (e && B(t, e)) ? C.merge([t], n) : n
          );
        }
        function wt(t, e) {
          for (let n = 0, o = t.length; n < o; n++) J.set(t[n], 'globalEval', !e || J.get(e[n], 'globalEval'));
        }
        (bt.tbody = bt.tfoot = bt.colgroup = bt.caption = bt.thead),
          (bt.th = bt.td),
          g.option || (bt.optgroup = bt.option = [1, "<select multiple='multiple'>", '</select>']);
        const Tt = /<|&#?\w+;/;
        function kt(t, e, n, o, r) {
          for (var i, a, s, u, l, c, d = e.createDocumentFragment(), p = [], f = 0, h = t.length; f < h; f++)
            if ((i = t[f]) || i === 0)
              if (T(i) === 'object') C.merge(p, i.nodeType ? [i] : i);
              else if (Tt.test(i)) {
                for (
                  a = a || d.appendChild(e.createElement('div')),
                    s = (vt.exec(i) || ['', ''])[1].toLowerCase(),
                    u = bt[s] || bt._default,
                    a.innerHTML = u[1] + C.htmlPrefilter(i) + u[2],
                    c = u[0];
                  c--;

                )
                  a = a.lastChild;
                C.merge(p, a.childNodes), ((a = d.firstChild).textContent = '');
              } else p.push(e.createTextNode(i));
          for (d.textContent = '', f = 0; (i = p[f++]); )
            if (o && C.inArray(i, o) > -1) r && r.push(i);
            else if (((l = st(i)), (a = xt(d.appendChild(i), 'script')), l && wt(a), n))
              for (c = 0; (i = a[c++]); ) yt.test(i.type || '') && n.push(i);
          return d;
        }
        const Ct = /^([^.]*)(?:\.(.+)|)/;
        function jt() {
          return !0;
        }
        function St() {
          return !1;
        }
        function At(t, e) {
          return (
            (t ===
              (function () {
                try {
                  return b.activeElement;
                } catch (t) {}
              })()) ==
            (e === 'focus')
          );
        }
        function Et(t, e, n, o, r, i) {
          let a;
          let s;
          if (typeof e === 'object') {
            for (s in (typeof n !== 'string' && ((o = o || n), (n = void 0)), e)) Et(t, s, n, o, e[s], i);
            return t;
          }
          if (
            (o == null && r == null
              ? ((r = n), (o = n = void 0))
              : r == null && (typeof n === 'string' ? ((r = o), (o = void 0)) : ((r = o), (o = n), (n = void 0))),
            !1 === r)
          )
            r = St;
          else if (!r) return t;
          return (
            i === 1 &&
              ((a = r),
              (r = function (t) {
                return C().off(t), a.apply(this, arguments);
              }),
              (r.guid = a.guid || (a.guid = C.guid++))),
            t.each(function () {
              C.event.add(this, e, r, o, n);
            })
          );
        }
        function _t(t, e, n) {
          n
            ? (J.set(t, e, !1),
              C.event.add(t, e, {
                namespace: !1,
                handler(t) {
                  let o;
                  let r;
                  let i = J.get(this, e);
                  if (1 & t.isTrigger && this[e]) {
                    if (i.length) (C.event.special[e] || {}).delegateType && t.stopPropagation();
                    else if (
                      ((i = s.call(arguments)),
                      J.set(this, e, i),
                      (o = n(this, e)),
                      this[e](),
                      i !== (r = J.get(this, e)) || o ? J.set(this, e, !1) : (r = {}),
                      i !== r)
                    )
                      return t.stopImmediatePropagation(), t.preventDefault(), r && r.value;
                  } else
                    i.length &&
                      (J.set(this, e, {
                        value: C.event.trigger(C.extend(i[0], C.Event.prototype), i.slice(1), this),
                      }),
                      t.stopImmediatePropagation());
                },
              }))
            : void 0 === J.get(t, e) && C.event.add(t, e, jt);
        }
        (C.event = {
          global: {},
          add(t, e, n, o, r) {
            let i;
            let a;
            let s;
            let u;
            let l;
            let c;
            let d;
            let p;
            let f;
            let h;
            let m;
            const g = J.get(t);
            if (Y(t))
              for (
                n.handler && ((n = (i = n).handler), (r = i.selector)),
                  r && C.find.matchesSelector(at, r),
                  n.guid || (n.guid = C.guid++),
                  (u = g.events) || (u = g.events = Object.create(null)),
                  (a = g.handle) ||
                    (a = g.handle =
                      function (e) {
                        return void 0 !== C && C.event.triggered !== e.type
                          ? C.event.dispatch.apply(t, arguments)
                          : void 0;
                      }),
                  l = (e = (e || '').match(H) || ['']).length;
                l--;

              )
                (f = m = (s = Ct.exec(e[l]) || [])[1]),
                  (h = (s[2] || '').split('.').sort()),
                  f &&
                    ((d = C.event.special[f] || {}),
                    (f = (r ? d.delegateType : d.bindType) || f),
                    (d = C.event.special[f] || {}),
                    (c = C.extend(
                      {
                        type: f,
                        origType: m,
                        data: o,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && C.expr.match.needsContext.test(r),
                        namespace: h.join('.'),
                      },
                      i,
                    )),
                    (p = u[f]) ||
                      (((p = u[f] = []).delegateCount = 0),
                      (d.setup && !1 !== d.setup.call(t, o, h, a)) || (t.addEventListener && t.addEventListener(f, a))),
                    d.add && (d.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)),
                    r ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                    (C.event.global[f] = !0));
          },
          remove(t, e, n, o, r) {
            let i;
            let a;
            let s;
            let u;
            let l;
            let c;
            let d;
            let p;
            let f;
            let h;
            let m;
            const g = J.hasData(t) && J.get(t);
            if (g && (u = g.events)) {
              for (l = (e = (e || '').match(H) || ['']).length; l--; )
                if (((f = m = (s = Ct.exec(e[l]) || [])[1]), (h = (s[2] || '').split('.').sort()), f)) {
                  for (
                    d = C.event.special[f] || {},
                      p = u[(f = (o ? d.delegateType : d.bindType) || f)] || [],
                      s = s[2] && new RegExp(`(^|\\.)${h.join('\\.(?:.*\\.|)')}(\\.|$)`),
                      a = i = p.length;
                    i--;

                  )
                    (c = p[i]),
                      (!r && m !== c.origType) ||
                        (n && n.guid !== c.guid) ||
                        (s && !s.test(c.namespace)) ||
                        (o && o !== c.selector && (o !== '**' || !c.selector)) ||
                        (p.splice(i, 1), c.selector && p.delegateCount--, d.remove && d.remove.call(t, c));
                  a &&
                    !p.length &&
                    ((d.teardown && !1 !== d.teardown.call(t, h, g.handle)) || C.removeEvent(t, f, g.handle),
                    delete u[f]);
                } else for (f in u) C.event.remove(t, f + e[l], n, o, !0);
              C.isEmptyObject(u) && J.remove(t, 'handle events');
            }
          },
          dispatch(t) {
            let e;
            let n;
            let o;
            let r;
            let i;
            let a;
            const s = new Array(arguments.length);
            const u = C.event.fix(t);
            const l = (J.get(this, 'events') || Object.create(null))[u.type] || [];
            const c = C.event.special[u.type] || {};
            for (s[0] = u, e = 1; e < arguments.length; e++) s[e] = arguments[e];
            if (((u.delegateTarget = this), !c.preDispatch || !1 !== c.preDispatch.call(this, u))) {
              for (a = C.event.handlers.call(this, u, l), e = 0; (r = a[e++]) && !u.isPropagationStopped(); )
                for (u.currentTarget = r.elem, n = 0; (i = r.handlers[n++]) && !u.isImmediatePropagationStopped(); )
                  (u.rnamespace && !1 !== i.namespace && !u.rnamespace.test(i.namespace)) ||
                    ((u.handleObj = i),
                    (u.data = i.data),
                    void 0 !== (o = ((C.event.special[i.origType] || {}).handle || i.handler).apply(r.elem, s)) &&
                      !1 === (u.result = o) &&
                      (u.preventDefault(), u.stopPropagation()));
              return c.postDispatch && c.postDispatch.call(this, u), u.result;
            }
          },
          handlers(t, e) {
            let n;
            let o;
            let r;
            let i;
            let a;
            const s = [];
            const u = e.delegateCount;
            let l = t.target;
            if (u && l.nodeType && !(t.type === 'click' && t.button >= 1))
              for (; l !== this; l = l.parentNode || this)
                if (l.nodeType === 1 && (t.type !== 'click' || !0 !== l.disabled)) {
                  for (i = [], a = {}, n = 0; n < u; n++)
                    void 0 === a[(r = `${(o = e[n]).selector} `)] &&
                      (a[r] = o.needsContext ? C(r, this).index(l) > -1 : C.find(r, this, null, [l]).length),
                      a[r] && i.push(o);
                  i.length && s.push({ elem: l, handlers: i });
                }
            return (l = this), u < e.length && s.push({ elem: l, handlers: e.slice(u) }), s;
          },
          addProp(t, e) {
            Object.defineProperty(C.Event.prototype, t, {
              enumerable: !0,
              configurable: !0,
              get: v(e)
                ? function () {
                    if (this.originalEvent) return e(this.originalEvent);
                  }
                : function () {
                    if (this.originalEvent) return this.originalEvent[t];
                  },
              set(e) {
                Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e });
              },
            });
          },
          fix(t) {
            return t[C.expando] ? t : new C.Event(t);
          },
          special: {
            load: { noBubble: !0 },
            click: {
              setup(t) {
                const e = this || t;
                return gt.test(e.type) && e.click && B(e, 'input') && _t(e, 'click', jt), !1;
              },
              trigger(t) {
                const e = this || t;
                return gt.test(e.type) && e.click && B(e, 'input') && _t(e, 'click'), !0;
              },
              _default(t) {
                const e = t.target;
                return (gt.test(e.type) && e.click && B(e, 'input') && J.get(e, 'click')) || B(e, 'a');
              },
            },
            beforeunload: {
              postDispatch(t) {
                void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result);
              },
            },
          },
        }),
          (C.removeEvent = function (t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n);
          }),
          (C.Event = function (t, e) {
            if (!(this instanceof C.Event)) return new C.Event(t, e);
            t && t.type
              ? ((this.originalEvent = t),
                (this.type = t.type),
                (this.isDefaultPrevented =
                  t.defaultPrevented || (void 0 === t.defaultPrevented && !1 === t.returnValue) ? jt : St),
                (this.target = t.target && t.target.nodeType === 3 ? t.target.parentNode : t.target),
                (this.currentTarget = t.currentTarget),
                (this.relatedTarget = t.relatedTarget))
              : (this.type = t),
              e && C.extend(this, e),
              (this.timeStamp = (t && t.timeStamp) || Date.now()),
              (this[C.expando] = !0);
          }),
          (C.Event.prototype = {
            constructor: C.Event,
            isDefaultPrevented: St,
            isPropagationStopped: St,
            isImmediatePropagationStopped: St,
            isSimulated: !1,
            preventDefault() {
              const t = this.originalEvent;
              (this.isDefaultPrevented = jt), t && !this.isSimulated && t.preventDefault();
            },
            stopPropagation() {
              const t = this.originalEvent;
              (this.isPropagationStopped = jt), t && !this.isSimulated && t.stopPropagation();
            },
            stopImmediatePropagation() {
              const t = this.originalEvent;
              (this.isImmediatePropagationStopped = jt),
                t && !this.isSimulated && t.stopImmediatePropagation(),
                this.stopPropagation();
            },
          }),
          C.each(
            {
              altKey: !0,
              bubbles: !0,
              cancelable: !0,
              changedTouches: !0,
              ctrlKey: !0,
              detail: !0,
              eventPhase: !0,
              metaKey: !0,
              pageX: !0,
              pageY: !0,
              shiftKey: !0,
              view: !0,
              char: !0,
              code: !0,
              charCode: !0,
              key: !0,
              keyCode: !0,
              button: !0,
              buttons: !0,
              clientX: !0,
              clientY: !0,
              offsetX: !0,
              offsetY: !0,
              pointerId: !0,
              pointerType: !0,
              screenX: !0,
              screenY: !0,
              targetTouches: !0,
              toElement: !0,
              touches: !0,
              which: !0,
            },
            C.event.addProp,
          ),
          C.each({ focus: 'focusin', blur: 'focusout' }, function (t, e) {
            C.event.special[t] = {
              setup() {
                return _t(this, t, At), !1;
              },
              trigger() {
                return _t(this, t), !0;
              },
              _default(e) {
                return J.get(e.target, t);
              },
              delegateType: e,
            };
          }),
          C.each(
            {
              mouseenter: 'mouseover',
              mouseleave: 'mouseout',
              pointerenter: 'pointerover',
              pointerleave: 'pointerout',
            },
            function (t, e) {
              C.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle(t) {
                  let n;
                  const o = t.relatedTarget;
                  const r = t.handleObj;
                  return (
                    (o && (o === this || C.contains(this, o))) ||
                      ((t.type = r.origType), (n = r.handler.apply(this, arguments)), (t.type = e)),
                    n
                  );
                },
              };
            },
          ),
          C.fn.extend({
            on(t, e, n, o) {
              return Et(this, t, e, n, o);
            },
            one(t, e, n, o) {
              return Et(this, t, e, n, o, 1);
            },
            off(t, e, n) {
              let o;
              let r;
              if (t && t.preventDefault && t.handleObj)
                return (
                  (o = t.handleObj),
                  C(t.delegateTarget).off(
                    o.namespace ? `${o.origType}.${o.namespace}` : o.origType,
                    o.selector,
                    o.handler,
                  ),
                  this
                );
              if (typeof t === 'object') {
                for (r in t) this.off(r, e, t[r]);
                return this;
              }
              return (
                (!1 !== e && typeof e !== 'function') || ((n = e), (e = void 0)),
                !1 === n && (n = St),
                this.each(function () {
                  C.event.remove(this, t, n, e);
                })
              );
            },
          });
        const Bt = /<script|<style|<link/i;
        const Dt = /checked\s*(?:[^=]|=\s*.checked.)/i;
        const Mt = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
        function Nt(t, e) {
          return (B(t, 'table') && B(e.nodeType !== 11 ? e : e.firstChild, 'tr') && C(t).children('tbody')[0]) || t;
        }
        function $t(t) {
          return (t.type = `${t.getAttribute('type') !== null}/${t.type}`), t;
        }
        function Lt(t) {
          return (t.type || '').slice(0, 5) === 'true/' ? (t.type = t.type.slice(5)) : t.removeAttribute('type'), t;
        }
        function Ft(t, e) {
          let n;
          let o;
          let r;
          let i;
          let a;
          let s;
          if (e.nodeType === 1) {
            if (J.hasData(t) && (s = J.get(t).events))
              for (r in (J.remove(e, 'handle events'), s))
                for (n = 0, o = s[r].length; n < o; n++) C.event.add(e, r, s[r][n]);
            Z.hasData(t) && ((i = Z.access(t)), (a = C.extend({}, i)), Z.set(e, a));
          }
        }
        function qt(t, e) {
          const n = e.nodeName.toLowerCase();
          n === 'input' && gt.test(t.type)
            ? (e.checked = t.checked)
            : (n !== 'input' && n !== 'textarea') || (e.defaultValue = t.defaultValue);
        }
        function Ht(t, e, n, o) {
          e = u(e);
          let r;
          let i;
          let a;
          let s;
          let l;
          let c;
          let d = 0;
          const p = t.length;
          const f = p - 1;
          const h = e[0];
          const m = v(h);
          if (m || (p > 1 && typeof h === 'string' && !g.checkClone && Dt.test(h)))
            return t.each(function (r) {
              const i = t.eq(r);
              m && (e[0] = h.call(this, r, i.html())), Ht(i, e, n, o);
            });
          if (
            p &&
            ((i = (r = kt(e, t[0].ownerDocument, !1, t, o)).firstChild), r.childNodes.length === 1 && (r = i), i || o)
          ) {
            for (s = (a = C.map(xt(r, 'script'), $t)).length; d < p; d++)
              (l = r), d !== f && ((l = C.clone(l, !0, !0)), s && C.merge(a, xt(l, 'script'))), n.call(t[d], l, d);
            if (s)
              for (c = a[a.length - 1].ownerDocument, C.map(a, Lt), d = 0; d < s; d++)
                (l = a[d]),
                  yt.test(l.type || '') &&
                    !J.access(l, 'globalEval') &&
                    C.contains(c, l) &&
                    (l.src && (l.type || '').toLowerCase() !== 'module'
                      ? C._evalUrl && !l.noModule && C._evalUrl(l.src, { nonce: l.nonce || l.getAttribute('nonce') }, c)
                      : w(l.textContent.replace(Mt, ''), l, c));
          }
          return t;
        }
        function Rt(t, e, n) {
          for (var o, r = e ? C.filter(e, t) : t, i = 0; (o = r[i]) != null; i++)
            n || o.nodeType !== 1 || C.cleanData(xt(o)),
              o.parentNode && (n && st(o) && wt(xt(o, 'script')), o.parentNode.removeChild(o));
          return t;
        }
        C.extend({
          htmlPrefilter(t) {
            return t;
          },
          clone(t, e, n) {
            let o;
            let r;
            let i;
            let a;
            const s = t.cloneNode(!0);
            const u = st(t);
            if (!(g.noCloneChecked || (t.nodeType !== 1 && t.nodeType !== 11) || C.isXMLDoc(t)))
              for (a = xt(s), o = 0, r = (i = xt(t)).length; o < r; o++) qt(i[o], a[o]);
            if (e)
              if (n) for (i = i || xt(t), a = a || xt(s), o = 0, r = i.length; o < r; o++) Ft(i[o], a[o]);
              else Ft(t, s);
            return (a = xt(s, 'script')).length > 0 && wt(a, !u && xt(t, 'script')), s;
          },
          cleanData(t) {
            for (var e, n, o, r = C.event.special, i = 0; void 0 !== (n = t[i]); i++)
              if (Y(n)) {
                if ((e = n[J.expando])) {
                  if (e.events) for (o in e.events) r[o] ? C.event.remove(n, o) : C.removeEvent(n, o, e.handle);
                  n[J.expando] = void 0;
                }
                n[Z.expando] && (n[Z.expando] = void 0);
              }
          },
        }),
          C.fn.extend({
            detach(t) {
              return Rt(this, t, !0);
            },
            remove(t) {
              return Rt(this, t);
            },
            text(t) {
              return U(
                this,
                function (t) {
                  return void 0 === t
                    ? C.text(this)
                    : this.empty().each(function () {
                        (this.nodeType !== 1 && this.nodeType !== 11 && this.nodeType !== 9) || (this.textContent = t);
                      });
                },
                null,
                t,
                arguments.length,
              );
            },
            append() {
              return Ht(this, arguments, function (t) {
                (this.nodeType !== 1 && this.nodeType !== 11 && this.nodeType !== 9) || Nt(this, t).appendChild(t);
              });
            },
            prepend() {
              return Ht(this, arguments, function (t) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                  const e = Nt(this, t);
                  e.insertBefore(t, e.firstChild);
                }
              });
            },
            before() {
              return Ht(this, arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this);
              });
            },
            after() {
              return Ht(this, arguments, function (t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
              });
            },
            empty() {
              for (var t, e = 0; (t = this[e]) != null; e++)
                t.nodeType === 1 && (C.cleanData(xt(t, !1)), (t.textContent = ''));
              return this;
            },
            clone(t, e) {
              return (
                (t = t != null && t),
                (e = e == null ? t : e),
                this.map(function () {
                  return C.clone(this, t, e);
                })
              );
            },
            html(t) {
              return U(
                this,
                function (t) {
                  let e = this[0] || {};
                  let n = 0;
                  const o = this.length;
                  if (void 0 === t && e.nodeType === 1) return e.innerHTML;
                  if (typeof t === 'string' && !Bt.test(t) && !bt[(vt.exec(t) || ['', ''])[1].toLowerCase()]) {
                    t = C.htmlPrefilter(t);
                    try {
                      for (; n < o; n++)
                        (e = this[n] || {}).nodeType === 1 && (C.cleanData(xt(e, !1)), (e.innerHTML = t));
                      e = 0;
                    } catch (t) {}
                  }
                  e && this.empty().append(t);
                },
                null,
                t,
                arguments.length,
              );
            },
            replaceWith() {
              const t = [];
              return Ht(
                this,
                arguments,
                function (e) {
                  const n = this.parentNode;
                  C.inArray(this, t) < 0 && (C.cleanData(xt(this)), n && n.replaceChild(e, this));
                },
                t,
              );
            },
          }),
          C.each(
            {
              appendTo: 'append',
              prependTo: 'prepend',
              insertBefore: 'before',
              insertAfter: 'after',
              replaceAll: 'replaceWith',
            },
            function (t, e) {
              C.fn[t] = function (t) {
                for (var n, o = [], r = C(t), i = r.length - 1, a = 0; a <= i; a++)
                  (n = a === i ? this : this.clone(!0)), C(r[a])[e](n), l.apply(o, n.get());
                return this.pushStack(o);
              };
            },
          );
        const It = new RegExp(`^(${ot})(?!px)[a-z%]+$`, 'i');
        const Ot = /^--/;
        const Pt = function (t) {
          let e = t.ownerDocument.defaultView;
          return (e && e.opener) || (e = o), e.getComputedStyle(t);
        };
        const Wt = function (t, e, n) {
          let o;
          let r;
          const i = {};
          for (r in e) (i[r] = t.style[r]), (t.style[r] = e[r]);
          for (r in ((o = n.call(t)), e)) t.style[r] = i[r];
          return o;
        };
        const zt = new RegExp(it.join('|'), 'i');
        const Ut = '[\\x20\\t\\r\\n\\f]';
        const Vt = new RegExp(`^${Ut}+|((?:^|[^\\\\])(?:\\\\.)*)${Ut}+$`, 'g');
        function Xt(t, e, n) {
          let o;
          let r;
          let i;
          let a;
          const s = Ot.test(e);
          const u = t.style;
          return (
            (n = n || Pt(t)) &&
              ((a = n.getPropertyValue(e) || n[e]),
              s && a && (a = a.replace(Vt, '$1') || void 0),
              a !== '' || st(t) || (a = C.style(t, e)),
              !g.pixelBoxStyles() &&
                It.test(a) &&
                zt.test(e) &&
                ((o = u.width),
                (r = u.minWidth),
                (i = u.maxWidth),
                (u.minWidth = u.maxWidth = u.width = a),
                (a = n.width),
                (u.width = o),
                (u.minWidth = r),
                (u.maxWidth = i))),
            void 0 !== a ? `${a}` : a
          );
        }
        function Gt(t, e) {
          return {
            get() {
              if (!t()) return (this.get = e).apply(this, arguments);
              delete this.get;
            },
          };
        }
        !(function () {
          function t() {
            if (c) {
              (l.style.cssText = 'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
                (c.style.cssText =
                  'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
                at.appendChild(l).appendChild(c);
              const t = o.getComputedStyle(c);
              (n = t.top !== '1%'),
                (u = e(t.marginLeft) === 12),
                (c.style.right = '60%'),
                (a = e(t.right) === 36),
                (r = e(t.width) === 36),
                (c.style.position = 'absolute'),
                (i = e(c.offsetWidth / 3) === 12),
                at.removeChild(l),
                (c = null);
            }
          }
          function e(t) {
            return Math.round(parseFloat(t));
          }
          let n;
          let r;
          let i;
          let a;
          let s;
          let u;
          var l = b.createElement('div');
          var c = b.createElement('div');
          c.style &&
            ((c.style.backgroundClip = 'content-box'),
            (c.cloneNode(!0).style.backgroundClip = ''),
            (g.clearCloneStyle = c.style.backgroundClip === 'content-box'),
            C.extend(g, {
              boxSizingReliable() {
                return t(), r;
              },
              pixelBoxStyles() {
                return t(), a;
              },
              pixelPosition() {
                return t(), n;
              },
              reliableMarginLeft() {
                return t(), u;
              },
              scrollboxSize() {
                return t(), i;
              },
              reliableTrDimensions() {
                let t;
                let e;
                let n;
                let r;
                return (
                  s == null &&
                    ((t = b.createElement('table')),
                    (e = b.createElement('tr')),
                    (n = b.createElement('div')),
                    (t.style.cssText = 'position:absolute;left:-11111px;border-collapse:separate'),
                    (e.style.cssText = 'border:1px solid'),
                    (e.style.height = '1px'),
                    (n.style.height = '9px'),
                    (n.style.display = 'block'),
                    at.appendChild(t).appendChild(e).appendChild(n),
                    (r = o.getComputedStyle(e)),
                    (s =
                      parseInt(r.height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) ===
                      e.offsetHeight),
                    at.removeChild(t)),
                  s
                );
              },
            }));
        })();
        const Kt = ['Webkit', 'Moz', 'ms'];
        const Yt = b.createElement('div').style;
        const Qt = {};
        function Jt(t) {
          const e = C.cssProps[t] || Qt[t];
          return (
            e ||
            (t in Yt
              ? t
              : (Qt[t] =
                  (function (t) {
                    for (let e = t[0].toUpperCase() + t.slice(1), n = Kt.length; n--; )
                      if ((t = Kt[n] + e) in Yt) return t;
                  })(t) || t))
          );
        }
        const Zt = /^(none|table(?!-c[ea]).+)/;
        const te = { position: 'absolute', visibility: 'hidden', display: 'block' };
        const ee = { letterSpacing: '0', fontWeight: '400' };
        function ne(t, e, n) {
          const o = rt.exec(e);
          return o ? Math.max(0, o[2] - (n || 0)) + (o[3] || 'px') : e;
        }
        function oe(t, e, n, o, r, i) {
          let a = e === 'width' ? 1 : 0;
          let s = 0;
          let u = 0;
          if (n === (o ? 'border' : 'content')) return 0;
          for (; a < 4; a += 2)
            n === 'margin' && (u += C.css(t, n + it[a], !0, r)),
              o
                ? (n === 'content' && (u -= C.css(t, `padding${it[a]}`, !0, r)),
                  n !== 'margin' && (u -= C.css(t, `border${it[a]}Width`, !0, r)))
                : ((u += C.css(t, `padding${it[a]}`, !0, r)),
                  n !== 'padding'
                    ? (u += C.css(t, `border${it[a]}Width`, !0, r))
                    : (s += C.css(t, `border${it[a]}Width`, !0, r)));
          return (
            !o &&
              i >= 0 &&
              (u += Math.max(0, Math.ceil(t[`offset${e[0].toUpperCase()}${e.slice(1)}`] - i - u - s - 0.5)) || 0),
            u
          );
        }
        function re(t, e, n) {
          const o = Pt(t);
          let r = (!g.boxSizingReliable() || n) && C.css(t, 'boxSizing', !1, o) === 'border-box';
          let i = r;
          let a = Xt(t, e, o);
          const s = `offset${e[0].toUpperCase()}${e.slice(1)}`;
          if (It.test(a)) {
            if (!n) return a;
            a = 'auto';
          }
          return (
            ((!g.boxSizingReliable() && r) ||
              (!g.reliableTrDimensions() && B(t, 'tr')) ||
              a === 'auto' ||
              (!parseFloat(a) && C.css(t, 'display', !1, o) === 'inline')) &&
              t.getClientRects().length &&
              ((r = C.css(t, 'boxSizing', !1, o) === 'border-box'), (i = s in t) && (a = t[s])),
            `${(a = parseFloat(a) || 0) + oe(t, e, n || (r ? 'border' : 'content'), i, o, a)}px`
          );
        }
        function ie(t, e, n, o, r) {
          return new ie.prototype.init(t, e, n, o, r);
        }
        C.extend({
          cssHooks: {
            opacity: {
              get(t, e) {
                if (e) {
                  const n = Xt(t, 'opacity');
                  return n === '' ? '1' : n;
                }
              },
            },
          },
          cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
          },
          cssProps: {},
          style(t, e, n, o) {
            if (t && t.nodeType !== 3 && t.nodeType !== 8 && t.style) {
              let r;
              let i;
              let a;
              const s = K(e);
              const u = Ot.test(e);
              const l = t.style;
              if ((u || (e = Jt(s)), (a = C.cssHooks[e] || C.cssHooks[s]), void 0 === n))
                return a && 'get' in a && void 0 !== (r = a.get(t, !1, o)) ? r : l[e];
              (i = typeof n) === 'string' && (r = rt.exec(n)) && r[1] && ((n = ct(t, e, r)), (i = 'number')),
                n != null &&
                  n == n &&
                  (i !== 'number' || u || (n += (r && r[3]) || (C.cssNumber[s] ? '' : 'px')),
                  g.clearCloneStyle || n !== '' || e.indexOf('background') !== 0 || (l[e] = 'inherit'),
                  (a && 'set' in a && void 0 === (n = a.set(t, n, o))) || (u ? l.setProperty(e, n) : (l[e] = n)));
            }
          },
          css(t, e, n, o) {
            let r;
            let i;
            let a;
            const s = K(e);
            return (
              Ot.test(e) || (e = Jt(s)),
              (a = C.cssHooks[e] || C.cssHooks[s]) && 'get' in a && (r = a.get(t, !0, n)),
              void 0 === r && (r = Xt(t, e, o)),
              r === 'normal' && e in ee && (r = ee[e]),
              n === '' || n ? ((i = parseFloat(r)), !0 === n || isFinite(i) ? i || 0 : r) : r
            );
          },
        }),
          C.each(['height', 'width'], function (t, e) {
            C.cssHooks[e] = {
              get(t, n, o) {
                if (n)
                  return !Zt.test(C.css(t, 'display')) || (t.getClientRects().length && t.getBoundingClientRect().width)
                    ? re(t, e, o)
                    : Wt(t, te, function () {
                        return re(t, e, o);
                      });
              },
              set(t, n, o) {
                let r;
                const i = Pt(t);
                const a = !g.scrollboxSize() && i.position === 'absolute';
                const s = (a || o) && C.css(t, 'boxSizing', !1, i) === 'border-box';
                let u = o ? oe(t, e, o, s, i) : 0;
                return (
                  s &&
                    a &&
                    (u -= Math.ceil(
                      t[`offset${e[0].toUpperCase()}${e.slice(1)}`] -
                        parseFloat(i[e]) -
                        oe(t, e, 'border', !1, i) -
                        0.5,
                    )),
                  u && (r = rt.exec(n)) && (r[3] || 'px') !== 'px' && ((t.style[e] = n), (n = C.css(t, e))),
                  ne(0, n, u)
                );
              },
            };
          }),
          (C.cssHooks.marginLeft = Gt(g.reliableMarginLeft, function (t, e) {
            if (e)
              return `${
                parseFloat(Xt(t, 'marginLeft')) ||
                t.getBoundingClientRect().left -
                  Wt(t, { marginLeft: 0 }, function () {
                    return t.getBoundingClientRect().left;
                  })
              }px`;
          })),
          C.each({ margin: '', padding: '', border: 'Width' }, function (t, e) {
            (C.cssHooks[t + e] = {
              expand(n) {
                for (var o = 0, r = {}, i = typeof n === 'string' ? n.split(' ') : [n]; o < 4; o++)
                  r[t + it[o] + e] = i[o] || i[o - 2] || i[0];
                return r;
              },
            }),
              t !== 'margin' && (C.cssHooks[t + e].set = ne);
          }),
          C.fn.extend({
            css(t, e) {
              return U(
                this,
                function (t, e, n) {
                  let o;
                  let r;
                  const i = {};
                  let a = 0;
                  if (Array.isArray(e)) {
                    for (o = Pt(t), r = e.length; a < r; a++) i[e[a]] = C.css(t, e[a], !1, o);
                    return i;
                  }
                  return void 0 !== n ? C.style(t, e, n) : C.css(t, e);
                },
                t,
                e,
                arguments.length > 1,
              );
            },
          }),
          (C.Tween = ie),
          (ie.prototype = {
            constructor: ie,
            init(t, e, n, o, r, i) {
              (this.elem = t),
                (this.prop = n),
                (this.easing = r || C.easing._default),
                (this.options = e),
                (this.start = this.now = this.cur()),
                (this.end = o),
                (this.unit = i || (C.cssNumber[n] ? '' : 'px'));
            },
            cur() {
              const t = ie.propHooks[this.prop];
              return t && t.get ? t.get(this) : ie.propHooks._default.get(this);
            },
            run(t) {
              let e;
              const n = ie.propHooks[this.prop];
              return (
                this.options.duration
                  ? (this.pos = e = C.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration))
                  : (this.pos = e = t),
                (this.now = (this.end - this.start) * e + this.start),
                this.options.step && this.options.step.call(this.elem, this.now, this),
                n && n.set ? n.set(this) : ie.propHooks._default.set(this),
                this
              );
            },
          }),
          (ie.prototype.init.prototype = ie.prototype),
          (ie.propHooks = {
            _default: {
              get(t) {
                let e;
                return t.elem.nodeType !== 1 || (t.elem[t.prop] != null && t.elem.style[t.prop] == null)
                  ? t.elem[t.prop]
                  : (e = C.css(t.elem, t.prop, '')) && e !== 'auto'
                  ? e
                  : 0;
              },
              set(t) {
                C.fx.step[t.prop]
                  ? C.fx.step[t.prop](t)
                  : t.elem.nodeType !== 1 || (!C.cssHooks[t.prop] && t.elem.style[Jt(t.prop)] == null)
                  ? (t.elem[t.prop] = t.now)
                  : C.style(t.elem, t.prop, t.now + t.unit);
              },
            },
          }),
          (ie.propHooks.scrollTop = ie.propHooks.scrollLeft =
            {
              set(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
              },
            }),
          (C.easing = {
            linear(t) {
              return t;
            },
            swing(t) {
              return 0.5 - Math.cos(t * Math.PI) / 2;
            },
            _default: 'swing',
          }),
          (C.fx = ie.prototype.init),
          (C.fx.step = {});
        let ae;
        let se;
        const ue = /^(?:toggle|show|hide)$/;
        const le = /queueHooks$/;
        function ce() {
          se &&
            (!1 === b.hidden && o.requestAnimationFrame ? o.requestAnimationFrame(ce) : o.setTimeout(ce, C.fx.interval),
            C.fx.tick());
        }
        function de() {
          return (
            o.setTimeout(function () {
              ae = void 0;
            }),
            (ae = Date.now())
          );
        }
        function pe(t, e) {
          let n;
          let o = 0;
          const r = { height: t };
          for (e = e ? 1 : 0; o < 4; o += 2 - e) r[`margin${(n = it[o])}`] = r[`padding${n}`] = t;
          return e && (r.opacity = r.width = t), r;
        }
        function fe(t, e, n) {
          for (var o, r = (he.tweeners[e] || []).concat(he.tweeners['*']), i = 0, a = r.length; i < a; i++)
            if ((o = r[i].call(n, e, t))) return o;
        }
        function he(t, e, n) {
          let o;
          let r;
          let i = 0;
          const a = he.prefilters.length;
          const s = C.Deferred().always(function () {
            delete u.elem;
          });
          var u = function () {
            if (r) return !1;
            for (
              var e = ae || de(),
                n = Math.max(0, l.startTime + l.duration - e),
                o = 1 - (n / l.duration || 0),
                i = 0,
                a = l.tweens.length;
              i < a;
              i++
            )
              l.tweens[i].run(o);
            return (
              s.notifyWith(t, [l, o, n]), o < 1 && a ? n : (a || s.notifyWith(t, [l, 1, 0]), s.resolveWith(t, [l]), !1)
            );
          };
          var l = s.promise({
            elem: t,
            props: C.extend({}, e),
            opts: C.extend(!0, { specialEasing: {}, easing: C.easing._default }, n),
            originalProperties: e,
            originalOptions: n,
            startTime: ae || de(),
            duration: n.duration,
            tweens: [],
            createTween(e, n) {
              const o = C.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
              return l.tweens.push(o), o;
            },
            stop(e) {
              let n = 0;
              const o = e ? l.tweens.length : 0;
              if (r) return this;
              for (r = !0; n < o; n++) l.tweens[n].run(1);
              return e ? (s.notifyWith(t, [l, 1, 0]), s.resolveWith(t, [l, e])) : s.rejectWith(t, [l, e]), this;
            },
          });
          const c = l.props;
          for (
            !(function (t, e) {
              let n;
              let o;
              let r;
              let i;
              let a;
              for (n in t)
                if (
                  ((r = e[(o = K(n))]),
                  (i = t[n]),
                  Array.isArray(i) && ((r = i[1]), (i = t[n] = i[0])),
                  n !== o && ((t[o] = i), delete t[n]),
                  (a = C.cssHooks[o]) && ('expand' in a))
                )
                  for (n in ((i = a.expand(i)), delete t[o], i)) (n in t) || ((t[n] = i[n]), (e[n] = r));
                else e[o] = r;
            })(c, l.opts.specialEasing);
            i < a;
            i++
          )
            if ((o = he.prefilters[i].call(l, t, c, l.opts)))
              return v(o.stop) && (C._queueHooks(l.elem, l.opts.queue).stop = o.stop.bind(o)), o;
          return (
            C.map(c, fe, l),
            v(l.opts.start) && l.opts.start.call(t, l),
            l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always),
            C.fx.timer(C.extend(u, { elem: t, anim: l, queue: l.opts.queue })),
            l
          );
        }
        (C.Animation = C.extend(he, {
          tweeners: {
            '*': [
              function (t, e) {
                const n = this.createTween(t, e);
                return ct(n.elem, t, rt.exec(e), n), n;
              },
            ],
          },
          tweener(t, e) {
            v(t) ? ((e = t), (t = ['*'])) : (t = t.match(H));
            for (var n, o = 0, r = t.length; o < r; o++)
              (n = t[o]), (he.tweeners[n] = he.tweeners[n] || []), he.tweeners[n].unshift(e);
          },
          prefilters: [
            function (t, e, n) {
              let o;
              let r;
              let i;
              let a;
              let s;
              let u;
              let l;
              let c;
              const d = 'width' in e || 'height' in e;
              const p = this;
              const f = {};
              const h = t.style;
              let m = t.nodeType && lt(t);
              let g = J.get(t, 'fxshow');
              for (o in (n.queue ||
                ((a = C._queueHooks(t, 'fx')).unqueued == null &&
                  ((a.unqueued = 0),
                  (s = a.empty.fire),
                  (a.empty.fire = function () {
                    a.unqueued || s();
                  })),
                a.unqueued++,
                p.always(function () {
                  p.always(function () {
                    a.unqueued--, C.queue(t, 'fx').length || a.empty.fire();
                  });
                })),
              e))
                if (((r = e[o]), ue.test(r))) {
                  if ((delete e[o], (i = i || r === 'toggle'), r === (m ? 'hide' : 'show'))) {
                    if (r !== 'show' || !g || void 0 === g[o]) continue;
                    m = !0;
                  }
                  f[o] = (g && g[o]) || C.style(t, o);
                }
              if ((u = !C.isEmptyObject(e)) || !C.isEmptyObject(f))
                for (o in (d &&
                  t.nodeType === 1 &&
                  ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                  (l = g && g.display) == null && (l = J.get(t, 'display')),
                  (c = C.css(t, 'display')) === 'none' &&
                    (l ? (c = l) : (ft([t], !0), (l = t.style.display || l), (c = C.css(t, 'display')), ft([t]))),
                  (c === 'inline' || (c === 'inline-block' && l != null)) &&
                    C.css(t, 'float') === 'none' &&
                    (u ||
                      (p.done(function () {
                        h.display = l;
                      }),
                      l == null && ((c = h.display), (l = c === 'none' ? '' : c))),
                    (h.display = 'inline-block'))),
                n.overflow &&
                  ((h.overflow = 'hidden'),
                  p.always(function () {
                    (h.overflow = n.overflow[0]), (h.overflowX = n.overflow[1]), (h.overflowY = n.overflow[2]);
                  })),
                (u = !1),
                f))
                  u ||
                    (g ? 'hidden' in g && (m = g.hidden) : (g = J.access(t, 'fxshow', { display: l })),
                    i && (g.hidden = !m),
                    m && ft([t], !0),
                    p.done(function () {
                      for (o in (m || ft([t]), J.remove(t, 'fxshow'), f)) C.style(t, o, f[o]);
                    })),
                    (u = fe(m ? g[o] : 0, o, p)),
                    o in g || ((g[o] = u.start), m && ((u.end = u.start), (u.start = 0)));
            },
          ],
          prefilter(t, e) {
            e ? he.prefilters.unshift(t) : he.prefilters.push(t);
          },
        })),
          (C.speed = function (t, e, n) {
            const o =
              t && typeof t === 'object'
                ? C.extend({}, t)
                : { complete: n || (!n && e) || (v(t) && t), duration: t, easing: (n && e) || (e && !v(e) && e) };
            return (
              C.fx.off
                ? (o.duration = 0)
                : typeof o.duration !== 'number' &&
                  (o.duration in C.fx.speeds
                    ? (o.duration = C.fx.speeds[o.duration])
                    : (o.duration = C.fx.speeds._default)),
              (o.queue != null && !0 !== o.queue) || (o.queue = 'fx'),
              (o.old = o.complete),
              (o.complete = function () {
                v(o.old) && o.old.call(this), o.queue && C.dequeue(this, o.queue);
              }),
              o
            );
          }),
          C.fn.extend({
            fadeTo(t, e, n, o) {
              return this.filter(lt).css('opacity', 0).show().end().animate({ opacity: e }, t, n, o);
            },
            animate(t, e, n, o) {
              const r = C.isEmptyObject(t);
              const i = C.speed(e, n, o);
              const a = function () {
                const e = he(this, C.extend({}, t), i);
                (r || J.get(this, 'finish')) && e.stop(!0);
              };
              return (a.finish = a), r || !1 === i.queue ? this.each(a) : this.queue(i.queue, a);
            },
            stop(t, e, n) {
              const o = function (t) {
                const e = t.stop;
                delete t.stop, e(n);
              };
              return (
                typeof t !== 'string' && ((n = e), (e = t), (t = void 0)),
                e && this.queue(t || 'fx', []),
                this.each(function () {
                  let e = !0;
                  let r = t != null && `${t}queueHooks`;
                  const i = C.timers;
                  const a = J.get(this);
                  if (r) a[r] && a[r].stop && o(a[r]);
                  else for (r in a) a[r] && a[r].stop && le.test(r) && o(a[r]);
                  for (r = i.length; r--; )
                    i[r].elem !== this ||
                      (t != null && i[r].queue !== t) ||
                      (i[r].anim.stop(n), (e = !1), i.splice(r, 1));
                  (!e && n) || C.dequeue(this, t);
                })
              );
            },
            finish(t) {
              return (
                !1 !== t && (t = t || 'fx'),
                this.each(function () {
                  let e;
                  const n = J.get(this);
                  const o = n[`${t}queue`];
                  const r = n[`${t}queueHooks`];
                  const i = C.timers;
                  const a = o ? o.length : 0;
                  for (n.finish = !0, C.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--; )
                    i[e].elem === this && i[e].queue === t && (i[e].anim.stop(!0), i.splice(e, 1));
                  for (e = 0; e < a; e++) o[e] && o[e].finish && o[e].finish.call(this);
                  delete n.finish;
                })
              );
            },
          }),
          C.each(['toggle', 'show', 'hide'], function (t, e) {
            const n = C.fn[e];
            C.fn[e] = function (t, o, r) {
              return t == null || typeof t === 'boolean' ? n.apply(this, arguments) : this.animate(pe(e, !0), t, o, r);
            };
          }),
          C.each(
            {
              slideDown: pe('show'),
              slideUp: pe('hide'),
              slideToggle: pe('toggle'),
              fadeIn: { opacity: 'show' },
              fadeOut: { opacity: 'hide' },
              fadeToggle: { opacity: 'toggle' },
            },
            function (t, e) {
              C.fn[t] = function (t, n, o) {
                return this.animate(e, t, n, o);
              };
            },
          ),
          (C.timers = []),
          (C.fx.tick = function () {
            let t;
            let e = 0;
            const n = C.timers;
            for (ae = Date.now(); e < n.length; e++) (t = n[e])() || n[e] !== t || n.splice(e--, 1);
            n.length || C.fx.stop(), (ae = void 0);
          }),
          (C.fx.timer = function (t) {
            C.timers.push(t), C.fx.start();
          }),
          (C.fx.interval = 13),
          (C.fx.start = function () {
            se || ((se = !0), ce());
          }),
          (C.fx.stop = function () {
            se = null;
          }),
          (C.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
          (C.fn.delay = function (t, e) {
            return (
              (t = (C.fx && C.fx.speeds[t]) || t),
              (e = e || 'fx'),
              this.queue(e, function (e, n) {
                const r = o.setTimeout(e, t);
                n.stop = function () {
                  o.clearTimeout(r);
                };
              })
            );
          }),
          (function () {
            let t = b.createElement('input');
            const e = b.createElement('select').appendChild(b.createElement('option'));
            (t.type = 'checkbox'),
              (g.checkOn = t.value !== ''),
              (g.optSelected = e.selected),
              ((t = b.createElement('input')).value = 't'),
              (t.type = 'radio'),
              (g.radioValue = t.value === 't');
          })();
        let me;
        const ge = C.expr.attrHandle;
        C.fn.extend({
          attr(t, e) {
            return U(this, C.attr, t, e, arguments.length > 1);
          },
          removeAttr(t) {
            return this.each(function () {
              C.removeAttr(this, t);
            });
          },
        }),
          C.extend({
            attr(t, e, n) {
              let o;
              let r;
              const i = t.nodeType;
              if (i !== 3 && i !== 8 && i !== 2)
                return void 0 === t.getAttribute
                  ? C.prop(t, e, n)
                  : ((i === 1 && C.isXMLDoc(t)) ||
                      (r = C.attrHooks[e.toLowerCase()] || (C.expr.match.bool.test(e) ? me : void 0)),
                    void 0 !== n
                      ? n === null
                        ? void C.removeAttr(t, e)
                        : r && 'set' in r && void 0 !== (o = r.set(t, n, e))
                        ? o
                        : (t.setAttribute(e, `${n}`), n)
                      : r && 'get' in r && (o = r.get(t, e)) !== null
                      ? o
                      : (o = C.find.attr(t, e)) == null
                      ? void 0
                      : o);
            },
            attrHooks: {
              type: {
                set(t, e) {
                  if (!g.radioValue && e === 'radio' && B(t, 'input')) {
                    const n = t.value;
                    return t.setAttribute('type', e), n && (t.value = n), e;
                  }
                },
              },
            },
            removeAttr(t, e) {
              let n;
              let o = 0;
              const r = e && e.match(H);
              if (r && t.nodeType === 1) for (; (n = r[o++]); ) t.removeAttribute(n);
            },
          }),
          (me = {
            set(t, e, n) {
              return !1 === e ? C.removeAttr(t, n) : t.setAttribute(n, n), n;
            },
          }),
          C.each(C.expr.match.bool.source.match(/\w+/g), function (t, e) {
            const n = ge[e] || C.find.attr;
            ge[e] = function (t, e, o) {
              let r;
              let i;
              const a = e.toLowerCase();
              return o || ((i = ge[a]), (ge[a] = r), (r = n(t, e, o) != null ? a : null), (ge[a] = i)), r;
            };
          });
        const ve = /^(?:input|select|textarea|button)$/i;
        const ye = /^(?:a|area)$/i;
        function be(t) {
          return (t.match(H) || []).join(' ');
        }
        function xe(t) {
          return (t.getAttribute && t.getAttribute('class')) || '';
        }
        function we(t) {
          return Array.isArray(t) ? t : (typeof t === 'string' && t.match(H)) || [];
        }
        C.fn.extend({
          prop(t, e) {
            return U(this, C.prop, t, e, arguments.length > 1);
          },
          removeProp(t) {
            return this.each(function () {
              delete this[C.propFix[t] || t];
            });
          },
        }),
          C.extend({
            prop(t, e, n) {
              let o;
              let r;
              const i = t.nodeType;
              if (i !== 3 && i !== 8 && i !== 2)
                return (
                  (i === 1 && C.isXMLDoc(t)) || ((e = C.propFix[e] || e), (r = C.propHooks[e])),
                  void 0 !== n
                    ? r && 'set' in r && void 0 !== (o = r.set(t, n, e))
                      ? o
                      : (t[e] = n)
                    : r && 'get' in r && (o = r.get(t, e)) !== null
                    ? o
                    : t[e]
                );
            },
            propHooks: {
              tabIndex: {
                get(t) {
                  const e = C.find.attr(t, 'tabindex');
                  return e ? parseInt(e, 10) : ve.test(t.nodeName) || (ye.test(t.nodeName) && t.href) ? 0 : -1;
                },
              },
            },
            propFix: { for: 'htmlFor', class: 'className' },
          }),
          g.optSelected ||
            (C.propHooks.selected = {
              get(t) {
                const e = t.parentNode;
                return e && e.parentNode && e.parentNode.selectedIndex, null;
              },
              set(t) {
                const e = t.parentNode;
                e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
              },
            }),
          C.each(
            [
              'tabIndex',
              'readOnly',
              'maxLength',
              'cellSpacing',
              'cellPadding',
              'rowSpan',
              'colSpan',
              'useMap',
              'frameBorder',
              'contentEditable',
            ],
            function () {
              C.propFix[this.toLowerCase()] = this;
            },
          ),
          C.fn.extend({
            addClass(t) {
              let e;
              let n;
              let o;
              let r;
              let i;
              let a;
              return v(t)
                ? this.each(function (e) {
                    C(this).addClass(t.call(this, e, xe(this)));
                  })
                : (e = we(t)).length
                ? this.each(function () {
                    if (((o = xe(this)), (n = this.nodeType === 1 && ` ${be(o)} `))) {
                      for (i = 0; i < e.length; i++) (r = e[i]), n.indexOf(` ${r} `) < 0 && (n += `${r} `);
                      (a = be(n)), o !== a && this.setAttribute('class', a);
                    }
                  })
                : this;
            },
            removeClass(t) {
              let e;
              let n;
              let o;
              let r;
              let i;
              let a;
              return v(t)
                ? this.each(function (e) {
                    C(this).removeClass(t.call(this, e, xe(this)));
                  })
                : arguments.length
                ? (e = we(t)).length
                  ? this.each(function () {
                      if (((o = xe(this)), (n = this.nodeType === 1 && ` ${be(o)} `))) {
                        for (i = 0; i < e.length; i++)
                          for (r = e[i]; n.indexOf(` ${r} `) > -1; ) n = n.replace(` ${r} `, ' ');
                        (a = be(n)), o !== a && this.setAttribute('class', a);
                      }
                    })
                  : this
                : this.attr('class', '');
            },
            toggleClass(t, e) {
              let n;
              let o;
              let r;
              let i;
              const a = typeof t;
              const s = a === 'string' || Array.isArray(t);
              return v(t)
                ? this.each(function (n) {
                    C(this).toggleClass(t.call(this, n, xe(this), e), e);
                  })
                : typeof e === 'boolean' && s
                ? e
                  ? this.addClass(t)
                  : this.removeClass(t)
                : ((n = we(t)),
                  this.each(function () {
                    if (s)
                      for (i = C(this), r = 0; r < n.length; r++)
                        (o = n[r]), i.hasClass(o) ? i.removeClass(o) : i.addClass(o);
                    else
                      (void 0 !== t && a !== 'boolean') ||
                        ((o = xe(this)) && J.set(this, '__className__', o),
                        this.setAttribute &&
                          this.setAttribute('class', o || !1 === t ? '' : J.get(this, '__className__') || ''));
                  }));
            },
            hasClass(t) {
              let e;
              let n;
              let o = 0;
              for (e = ` ${t} `; (n = this[o++]); ) if (n.nodeType === 1 && ` ${be(xe(n))} `.indexOf(e) > -1) return !0;
              return !1;
            },
          });
        const Te = /\r/g;
        C.fn.extend({
          val(t) {
            let e;
            let n;
            let o;
            const r = this[0];
            return arguments.length
              ? ((o = v(t)),
                this.each(function (n) {
                  let r;
                  this.nodeType === 1 &&
                    ((r = o ? t.call(this, n, C(this).val()) : t) == null
                      ? (r = '')
                      : typeof r === 'number'
                      ? (r += '')
                      : Array.isArray(r) &&
                        (r = C.map(r, function (t) {
                          return t == null ? '' : `${t}`;
                        })),
                    ((e = C.valHooks[this.type] || C.valHooks[this.nodeName.toLowerCase()]) &&
                      'set' in e &&
                      void 0 !== e.set(this, r, 'value')) ||
                      (this.value = r));
                }))
              : r
              ? (e = C.valHooks[r.type] || C.valHooks[r.nodeName.toLowerCase()]) &&
                'get' in e &&
                void 0 !== (n = e.get(r, 'value'))
                ? n
                : typeof (n = r.value) === 'string'
                ? n.replace(Te, '')
                : n == null
                ? ''
                : n
              : void 0;
          },
        }),
          C.extend({
            valHooks: {
              option: {
                get(t) {
                  const e = C.find.attr(t, 'value');
                  return e != null ? e : be(C.text(t));
                },
              },
              select: {
                get(t) {
                  let e;
                  let n;
                  let o;
                  const r = t.options;
                  const i = t.selectedIndex;
                  const a = t.type === 'select-one';
                  const s = a ? null : [];
                  const u = a ? i + 1 : r.length;
                  for (o = i < 0 ? u : a ? i : 0; o < u; o++)
                    if (
                      ((n = r[o]).selected || o === i) &&
                      !n.disabled &&
                      (!n.parentNode.disabled || !B(n.parentNode, 'optgroup'))
                    ) {
                      if (((e = C(n).val()), a)) return e;
                      s.push(e);
                    }
                  return s;
                },
                set(t, e) {
                  for (var n, o, r = t.options, i = C.makeArray(e), a = r.length; a--; )
                    ((o = r[a]).selected = C.inArray(C.valHooks.option.get(o), i) > -1) && (n = !0);
                  return n || (t.selectedIndex = -1), i;
                },
              },
            },
          }),
          C.each(['radio', 'checkbox'], function () {
            (C.valHooks[this] = {
              set(t, e) {
                if (Array.isArray(e)) return (t.checked = C.inArray(C(t).val(), e) > -1);
              },
            }),
              g.checkOn ||
                (C.valHooks[this].get = function (t) {
                  return t.getAttribute('value') === null ? 'on' : t.value;
                });
          }),
          (g.focusin = 'onfocusin' in o);
        const ke = /^(?:focusinfocus|focusoutblur)$/;
        const Ce = function (t) {
          t.stopPropagation();
        };
        C.extend(C.event, {
          trigger(t, e, n, r) {
            let i;
            let a;
            let s;
            let u;
            let l;
            let c;
            let d;
            let p;
            const h = [n || b];
            let m = f.call(t, 'type') ? t.type : t;
            let g = f.call(t, 'namespace') ? t.namespace.split('.') : [];
            if (
              ((a = p = s = n = n || b),
              n.nodeType !== 3 &&
                n.nodeType !== 8 &&
                !ke.test(m + C.event.triggered) &&
                (m.indexOf('.') > -1 && ((g = m.split('.')), (m = g.shift()), g.sort()),
                (l = m.indexOf(':') < 0 && `on${m}`),
                ((t = t[C.expando] ? t : new C.Event(m, typeof t === 'object' && t)).isTrigger = r ? 2 : 3),
                (t.namespace = g.join('.')),
                (t.rnamespace = t.namespace ? new RegExp(`(^|\\.)${g.join('\\.(?:.*\\.|)')}(\\.|$)`) : null),
                (t.result = void 0),
                t.target || (t.target = n),
                (e = e == null ? [t] : C.makeArray(e, [t])),
                (d = C.event.special[m] || {}),
                r || !d.trigger || !1 !== d.trigger.apply(n, e)))
            ) {
              if (!r && !d.noBubble && !y(n)) {
                for (u = d.delegateType || m, ke.test(u + m) || (a = a.parentNode); a; a = a.parentNode)
                  h.push(a), (s = a);
                s === (n.ownerDocument || b) && h.push(s.defaultView || s.parentWindow || o);
              }
              for (i = 0; (a = h[i++]) && !t.isPropagationStopped(); )
                (p = a),
                  (t.type = i > 1 ? u : d.bindType || m),
                  (c = (J.get(a, 'events') || Object.create(null))[t.type] && J.get(a, 'handle')) && c.apply(a, e),
                  (c = l && a[l]) &&
                    c.apply &&
                    Y(a) &&
                    ((t.result = c.apply(a, e)), !1 === t.result && t.preventDefault());
              return (
                (t.type = m),
                r ||
                  t.isDefaultPrevented() ||
                  (d._default && !1 !== d._default.apply(h.pop(), e)) ||
                  !Y(n) ||
                  (l &&
                    v(n[m]) &&
                    !y(n) &&
                    ((s = n[l]) && (n[l] = null),
                    (C.event.triggered = m),
                    t.isPropagationStopped() && p.addEventListener(m, Ce),
                    n[m](),
                    t.isPropagationStopped() && p.removeEventListener(m, Ce),
                    (C.event.triggered = void 0),
                    s && (n[l] = s))),
                t.result
              );
            }
          },
          simulate(t, e, n) {
            const o = C.extend(new C.Event(), n, { type: t, isSimulated: !0 });
            C.event.trigger(o, null, e);
          },
        }),
          C.fn.extend({
            trigger(t, e) {
              return this.each(function () {
                C.event.trigger(t, e, this);
              });
            },
            triggerHandler(t, e) {
              const n = this[0];
              if (n) return C.event.trigger(t, e, n, !0);
            },
          }),
          g.focusin ||
            C.each({ focus: 'focusin', blur: 'focusout' }, function (t, e) {
              const n = function (t) {
                C.event.simulate(e, t.target, C.event.fix(t));
              };
              C.event.special[e] = {
                setup() {
                  const o = this.ownerDocument || this.document || this;
                  const r = J.access(o, e);
                  r || o.addEventListener(t, n, !0), J.access(o, e, (r || 0) + 1);
                },
                teardown() {
                  const o = this.ownerDocument || this.document || this;
                  const r = J.access(o, e) - 1;
                  r ? J.access(o, e, r) : (o.removeEventListener(t, n, !0), J.remove(o, e));
                },
              };
            });
        const je = o.location;
        const Se = { guid: Date.now() };
        const Ae = /\?/;
        C.parseXML = function (t) {
          let e;
          let n;
          if (!t || typeof t !== 'string') return null;
          try {
            e = new o.DOMParser().parseFromString(t, 'text/xml');
          } catch (t) {}
          return (
            (n = e && e.getElementsByTagName('parsererror')[0]),
            (e && !n) ||
              C.error(
                `Invalid XML: ${
                  n
                    ? C.map(n.childNodes, function (t) {
                        return t.textContent;
                      }).join('\n')
                    : t
                }`,
              ),
            e
          );
        };
        const Ee = /\[\]$/;
        const _e = /\r?\n/g;
        const Be = /^(?:submit|button|image|reset|file)$/i;
        const De = /^(?:input|select|textarea|keygen)/i;
        function Me(t, e, n, o) {
          let r;
          if (Array.isArray(e))
            C.each(e, function (e, r) {
              n || Ee.test(t) ? o(t, r) : Me(`${t}[${typeof r === 'object' && r != null ? e : ''}]`, r, n, o);
            });
          else if (n || T(e) !== 'object') o(t, e);
          else for (r in e) Me(`${t}[${r}]`, e[r], n, o);
        }
        (C.param = function (t, e) {
          let n;
          const o = [];
          const r = function (t, e) {
            const n = v(e) ? e() : e;
            o[o.length] = `${encodeURIComponent(t)}=${encodeURIComponent(n == null ? '' : n)}`;
          };
          if (t == null) return '';
          if (Array.isArray(t) || (t.jquery && !C.isPlainObject(t)))
            C.each(t, function () {
              r(this.name, this.value);
            });
          else for (n in t) Me(n, t[n], e, r);
          return o.join('&');
        }),
          C.fn.extend({
            serialize() {
              return C.param(this.serializeArray());
            },
            serializeArray() {
              return this.map(function () {
                const t = C.prop(this, 'elements');
                return t ? C.makeArray(t) : this;
              })
                .filter(function () {
                  const t = this.type;
                  return (
                    this.name &&
                    !C(this).is(':disabled') &&
                    De.test(this.nodeName) &&
                    !Be.test(t) &&
                    (this.checked || !gt.test(t))
                  );
                })
                .map(function (t, e) {
                  const n = C(this).val();
                  return n == null
                    ? null
                    : Array.isArray(n)
                    ? C.map(n, function (t) {
                        return { name: e.name, value: t.replace(_e, '\r\n') };
                      })
                    : { name: e.name, value: n.replace(_e, '\r\n') };
                })
                .get();
            },
          });
        const Ne = /%20/g;
        const $e = /#.*$/;
        const Le = /([?&])_=[^&]*/;
        const Fe = /^(.*?):[ \t]*([^\r\n]*)$/gm;
        const qe = /^(?:GET|HEAD)$/;
        const He = /^\/\//;
        const Re = {};
        const Ie = {};
        const Oe = '*/'.concat('*');
        const Pe = b.createElement('a');
        function We(t) {
          return function (e, n) {
            typeof e !== 'string' && ((n = e), (e = '*'));
            let o;
            let r = 0;
            const i = e.toLowerCase().match(H) || [];
            if (v(n))
              for (; (o = i[r++]); )
                o[0] === '+' ? ((o = o.slice(1) || '*'), (t[o] = t[o] || []).unshift(n)) : (t[o] = t[o] || []).push(n);
          };
        }
        function ze(t, e, n, o) {
          const r = {};
          const i = t === Ie;
          function a(s) {
            let u;
            return (
              (r[s] = !0),
              C.each(t[s] || [], function (t, s) {
                const l = s(e, n, o);
                return typeof l !== 'string' || i || r[l]
                  ? i
                    ? !(u = l)
                    : void 0
                  : (e.dataTypes.unshift(l), a(l), !1);
              }),
              u
            );
          }
          return a(e.dataTypes[0]) || (!r['*'] && a('*'));
        }
        function Ue(t, e) {
          let n;
          let o;
          const r = C.ajaxSettings.flatOptions || {};
          for (n in e) void 0 !== e[n] && ((r[n] ? t : o || (o = {}))[n] = e[n]);
          return o && C.extend(!0, t, o), t;
        }
        (Pe.href = je.href),
          C.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
              url: je.href,
              type: 'GET',
              isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(je.protocol),
              global: !0,
              processData: !0,
              async: !0,
              contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
              accepts: {
                '*': Oe,
                text: 'text/plain',
                html: 'text/html',
                xml: 'application/xml, text/xml',
                json: 'application/json, text/javascript',
              },
              contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
              responseFields: { xml: 'responseXML', text: 'responseText', json: 'responseJSON' },
              converters: { '* text': String, 'text html': !0, 'text json': JSON.parse, 'text xml': C.parseXML },
              flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup(t, e) {
              return e ? Ue(Ue(t, C.ajaxSettings), e) : Ue(C.ajaxSettings, t);
            },
            ajaxPrefilter: We(Re),
            ajaxTransport: We(Ie),
            ajax(t, e) {
              typeof t === 'object' && ((e = t), (t = void 0)), (e = e || {});
              let n;
              let r;
              let i;
              let a;
              let s;
              let u;
              let l;
              let c;
              let d;
              let p;
              const f = C.ajaxSetup({}, e);
              const h = f.context || f;
              const m = f.context && (h.nodeType || h.jquery) ? C(h) : C.event;
              const g = C.Deferred();
              const v = C.Callbacks('once memory');
              let y = f.statusCode || {};
              const x = {};
              const w = {};
              let T = 'canceled';
              var k = {
                readyState: 0,
                getResponseHeader(t) {
                  let e;
                  if (l) {
                    if (!a)
                      for (a = {}; (e = Fe.exec(i)); )
                        a[`${e[1].toLowerCase()} `] = (a[`${e[1].toLowerCase()} `] || []).concat(e[2]);
                    e = a[`${t.toLowerCase()} `];
                  }
                  return e == null ? null : e.join(', ');
                },
                getAllResponseHeaders() {
                  return l ? i : null;
                },
                setRequestHeader(t, e) {
                  return l == null && ((t = w[t.toLowerCase()] = w[t.toLowerCase()] || t), (x[t] = e)), this;
                },
                overrideMimeType(t) {
                  return l == null && (f.mimeType = t), this;
                },
                statusCode(t) {
                  let e;
                  if (t)
                    if (l) k.always(t[k.status]);
                    else for (e in t) y[e] = [y[e], t[e]];
                  return this;
                },
                abort(t) {
                  const e = t || T;
                  return n && n.abort(e), j(0, e), this;
                },
              };
              if (
                (g.promise(k),
                (f.url = `${t || f.url || je.href}`.replace(He, `${je.protocol}//`)),
                (f.type = e.method || e.type || f.method || f.type),
                (f.dataTypes = (f.dataType || '*').toLowerCase().match(H) || ['']),
                f.crossDomain == null)
              ) {
                u = b.createElement('a');
                try {
                  (u.href = f.url),
                    (u.href = u.href),
                    (f.crossDomain = `${Pe.protocol}//${Pe.host}` != `${u.protocol}//${u.host}`);
                } catch (t) {
                  f.crossDomain = !0;
                }
              }
              if (
                (f.data && f.processData && typeof f.data !== 'string' && (f.data = C.param(f.data, f.traditional)),
                ze(Re, f, e, k),
                l)
              )
                return k;
              for (d in ((c = C.event && f.global) && C.active++ == 0 && C.event.trigger('ajaxStart'),
              (f.type = f.type.toUpperCase()),
              (f.hasContent = !qe.test(f.type)),
              (r = f.url.replace($e, '')),
              f.hasContent
                ? f.data &&
                  f.processData &&
                  (f.contentType || '').indexOf('application/x-www-form-urlencoded') === 0 &&
                  (f.data = f.data.replace(Ne, '+'))
                : ((p = f.url.slice(r.length)),
                  f.data &&
                    (f.processData || typeof f.data === 'string') &&
                    ((r += (Ae.test(r) ? '&' : '?') + f.data), delete f.data),
                  !1 === f.cache && ((r = r.replace(Le, '$1')), (p = `${Ae.test(r) ? '&' : '?'}_=${Se.guid++}${p}`)),
                  (f.url = r + p)),
              f.ifModified &&
                (C.lastModified[r] && k.setRequestHeader('If-Modified-Since', C.lastModified[r]),
                C.etag[r] && k.setRequestHeader('If-None-Match', C.etag[r])),
              ((f.data && f.hasContent && !1 !== f.contentType) || e.contentType) &&
                k.setRequestHeader('Content-Type', f.contentType),
              k.setRequestHeader(
                'Accept',
                f.dataTypes[0] && f.accepts[f.dataTypes[0]]
                  ? f.accepts[f.dataTypes[0]] + (f.dataTypes[0] !== '*' ? `, ${Oe}; q=0.01` : '')
                  : f.accepts['*'],
              ),
              f.headers))
                k.setRequestHeader(d, f.headers[d]);
              if (f.beforeSend && (!1 === f.beforeSend.call(h, k, f) || l)) return k.abort();
              if (((T = 'abort'), v.add(f.complete), k.done(f.success), k.fail(f.error), (n = ze(Ie, f, e, k)))) {
                if (((k.readyState = 1), c && m.trigger('ajaxSend', [k, f]), l)) return k;
                f.async &&
                  f.timeout > 0 &&
                  (s = o.setTimeout(function () {
                    k.abort('timeout');
                  }, f.timeout));
                try {
                  (l = !1), n.send(x, j);
                } catch (t) {
                  if (l) throw t;
                  j(-1, t);
                }
              } else j(-1, 'No Transport');
              function j(t, e, a, u) {
                let d;
                let p;
                let b;
                let x;
                let w;
                let T = e;
                l ||
                  ((l = !0),
                  s && o.clearTimeout(s),
                  (n = void 0),
                  (i = u || ''),
                  (k.readyState = t > 0 ? 4 : 0),
                  (d = (t >= 200 && t < 300) || t === 304),
                  a &&
                    (x = (function (t, e, n) {
                      for (var o, r, i, a, s = t.contents, u = t.dataTypes; u[0] === '*'; )
                        u.shift(), void 0 === o && (o = t.mimeType || e.getResponseHeader('Content-Type'));
                      if (o)
                        for (r in s)
                          if (s[r] && s[r].test(o)) {
                            u.unshift(r);
                            break;
                          }
                      if (u[0] in n) i = u[0];
                      else {
                        for (r in n) {
                          if (!u[0] || t.converters[`${r} ${u[0]}`]) {
                            i = r;
                            break;
                          }
                          a || (a = r);
                        }
                        i = i || a;
                      }
                      if (i) return i !== u[0] && u.unshift(i), n[i];
                    })(f, k, a)),
                  !d &&
                    C.inArray('script', f.dataTypes) > -1 &&
                    C.inArray('json', f.dataTypes) < 0 &&
                    (f.converters['text script'] = function () {}),
                  (x = (function (t, e, n, o) {
                    let r;
                    let i;
                    let a;
                    let s;
                    let u;
                    const l = {};
                    const c = t.dataTypes.slice();
                    if (c[1]) for (a in t.converters) l[a.toLowerCase()] = t.converters[a];
                    for (i = c.shift(); i; )
                      if (
                        (t.responseFields[i] && (n[t.responseFields[i]] = e),
                        !u && o && t.dataFilter && (e = t.dataFilter(e, t.dataType)),
                        (u = i),
                        (i = c.shift()))
                      )
                        if (i === '*') i = u;
                        else if (u !== '*' && u !== i) {
                          if (!(a = l[`${u} ${i}`] || l[`* ${i}`]))
                            for (r in l)
                              if ((s = r.split(' '))[1] === i && (a = l[`${u} ${s[0]}`] || l[`* ${s[0]}`])) {
                                !0 === a ? (a = l[r]) : !0 !== l[r] && ((i = s[0]), c.unshift(s[1]));
                                break;
                              }
                          if (!0 !== a)
                            if (a && t.throws) e = a(e);
                            else
                              try {
                                e = a(e);
                              } catch (t) {
                                return {
                                  state: 'parsererror',
                                  error: a ? t : `No conversion from ${u} to ${i}`,
                                };
                              }
                        }
                    return { state: 'success', data: e };
                  })(f, x, k, d)),
                  d
                    ? (f.ifModified &&
                        ((w = k.getResponseHeader('Last-Modified')) && (C.lastModified[r] = w),
                        (w = k.getResponseHeader('etag')) && (C.etag[r] = w)),
                      t === 204 || f.type === 'HEAD'
                        ? (T = 'nocontent')
                        : t === 304
                        ? (T = 'notmodified')
                        : ((T = x.state), (p = x.data), (d = !(b = x.error))))
                    : ((b = T), (!t && T) || ((T = 'error'), t < 0 && (t = 0))),
                  (k.status = t),
                  (k.statusText = `${e || T}`),
                  d ? g.resolveWith(h, [p, T, k]) : g.rejectWith(h, [k, T, b]),
                  k.statusCode(y),
                  (y = void 0),
                  c && m.trigger(d ? 'ajaxSuccess' : 'ajaxError', [k, f, d ? p : b]),
                  v.fireWith(h, [k, T]),
                  c && (m.trigger('ajaxComplete', [k, f]), --C.active || C.event.trigger('ajaxStop')));
              }
              return k;
            },
            getJSON(t, e, n) {
              return C.get(t, e, n, 'json');
            },
            getScript(t, e) {
              return C.get(t, void 0, e, 'script');
            },
          }),
          C.each(['get', 'post'], function (t, e) {
            C[e] = function (t, n, o, r) {
              return (
                v(n) && ((r = r || o), (o = n), (n = void 0)),
                C.ajax(C.extend({ url: t, type: e, dataType: r, data: n, success: o }, C.isPlainObject(t) && t))
              );
            };
          }),
          C.ajaxPrefilter(function (t) {
            let e;
            for (e in t.headers) e.toLowerCase() === 'content-type' && (t.contentType = t.headers[e] || '');
          }),
          (C._evalUrl = function (t, e, n) {
            return C.ajax({
              url: t,
              type: 'GET',
              dataType: 'script',
              cache: !0,
              async: !1,
              global: !1,
              converters: { 'text script': function () {} },
              dataFilter(t) {
                C.globalEval(t, e, n);
              },
            });
          }),
          C.fn.extend({
            wrapAll(t) {
              let e;
              return (
                this[0] &&
                  (v(t) && (t = t.call(this[0])),
                  (e = C(t, this[0].ownerDocument).eq(0).clone(!0)),
                  this[0].parentNode && e.insertBefore(this[0]),
                  e
                    .map(function () {
                      for (var t = this; t.firstElementChild; ) t = t.firstElementChild;
                      return t;
                    })
                    .append(this)),
                this
              );
            },
            wrapInner(t) {
              return v(t)
                ? this.each(function (e) {
                    C(this).wrapInner(t.call(this, e));
                  })
                : this.each(function () {
                    const e = C(this);
                    const n = e.contents();
                    n.length ? n.wrapAll(t) : e.append(t);
                  });
            },
            wrap(t) {
              const e = v(t);
              return this.each(function (n) {
                C(this).wrapAll(e ? t.call(this, n) : t);
              });
            },
            unwrap(t) {
              return (
                this.parent(t)
                  .not('body')
                  .each(function () {
                    C(this).replaceWith(this.childNodes);
                  }),
                this
              );
            },
          }),
          (C.expr.pseudos.hidden = function (t) {
            return !C.expr.pseudos.visible(t);
          }),
          (C.expr.pseudos.visible = function (t) {
            return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
          }),
          (C.ajaxSettings.xhr = function () {
            try {
              return new o.XMLHttpRequest();
            } catch (t) {}
          });
        const Ve = { 0: 200, 1223: 204 };
        let Xe = C.ajaxSettings.xhr();
        (g.cors = !!Xe && 'withCredentials' in Xe),
          (g.ajax = Xe = !!Xe),
          C.ajaxTransport(function (t) {
            let e;
            let n;
            if (g.cors || (Xe && !t.crossDomain))
              return {
                send(r, i) {
                  let a;
                  const s = t.xhr();
                  if ((s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields))
                    for (a in t.xhrFields) s[a] = t.xhrFields[a];
                  for (a in (t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType),
                  t.crossDomain || r['X-Requested-With'] || (r['X-Requested-With'] = 'XMLHttpRequest'),
                  r))
                    s.setRequestHeader(a, r[a]);
                  (e = function (t) {
                    return function () {
                      e &&
                        ((e = n = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null),
                        t === 'abort'
                          ? s.abort()
                          : t === 'error'
                          ? typeof s.status !== 'number'
                            ? i(0, 'error')
                            : i(s.status, s.statusText)
                          : i(
                              Ve[s.status] || s.status,
                              s.statusText,
                              (s.responseType || 'text') !== 'text' || typeof s.responseText !== 'string'
                                ? { binary: s.response }
                                : { text: s.responseText },
                              s.getAllResponseHeaders(),
                            ));
                    };
                  }),
                    (s.onload = e()),
                    (n = s.onerror = s.ontimeout = e('error')),
                    void 0 !== s.onabort
                      ? (s.onabort = n)
                      : (s.onreadystatechange = function () {
                          s.readyState === 4 &&
                            o.setTimeout(function () {
                              e && n();
                            });
                        }),
                    (e = e('abort'));
                  try {
                    s.send((t.hasContent && t.data) || null);
                  } catch (t) {
                    if (e) throw t;
                  }
                },
                abort() {
                  e && e();
                },
              };
          }),
          C.ajaxPrefilter(function (t) {
            t.crossDomain && (t.contents.script = !1);
          }),
          C.ajaxSetup({
            accepts: {
              script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
            },
            contents: { script: /\b(?:java|ecma)script\b/ },
            converters: {
              'text script': function (t) {
                return C.globalEval(t), t;
              },
            },
          }),
          C.ajaxPrefilter('script', function (t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = 'GET');
          }),
          C.ajaxTransport('script', function (t) {
            let e;
            let n;
            if (t.crossDomain || t.scriptAttrs)
              return {
                send(o, r) {
                  (e = C('<script>')
                    .attr(t.scriptAttrs || {})
                    .prop({ charset: t.scriptCharset, src: t.url })
                    .on(
                      'load error',
                      (n = function (t) {
                        e.remove(), (n = null), t && r(t.type === 'error' ? 404 : 200, t.type);
                      }),
                    )),
                    b.head.appendChild(e[0]);
                },
                abort() {
                  n && n();
                },
              };
          });
        let Ge;
        const Ke = [];
        const Ye = /(=)\?(?=&|$)|\?\?/;
        C.ajaxSetup({
          jsonp: 'callback',
          jsonpCallback() {
            const t = Ke.pop() || `${C.expando}_${Se.guid++}`;
            return (this[t] = !0), t;
          },
        }),
          C.ajaxPrefilter('json jsonp', function (t, e, n) {
            let r;
            let i;
            let a;
            const s =
              !1 !== t.jsonp &&
              (Ye.test(t.url)
                ? 'url'
                : typeof t.data === 'string' &&
                  (t.contentType || '').indexOf('application/x-www-form-urlencoded') === 0 &&
                  Ye.test(t.data) &&
                  'data');
            if (s || t.dataTypes[0] === 'jsonp')
              return (
                (r = t.jsonpCallback = v(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                s
                  ? (t[s] = t[s].replace(Ye, `$1${r}`))
                  : !1 !== t.jsonp && (t.url += `${(Ae.test(t.url) ? '&' : '?') + t.jsonp}=${r}`),
                (t.converters['script json'] = function () {
                  return a || C.error(`${r} was not called`), a[0];
                }),
                (t.dataTypes[0] = 'json'),
                (i = o[r]),
                (o[r] = function () {
                  a = arguments;
                }),
                n.always(function () {
                  void 0 === i ? C(o).removeProp(r) : (o[r] = i),
                    t[r] && ((t.jsonpCallback = e.jsonpCallback), Ke.push(r)),
                    a && v(i) && i(a[0]),
                    (a = i = void 0);
                }),
                'script'
              );
          }),
          (g.createHTMLDocument =
            (((Ge = b.implementation.createHTMLDocument('').body).innerHTML = '<form></form><form></form>'),
            Ge.childNodes.length === 2)),
          (C.parseHTML = function (t, e, n) {
            return typeof t !== 'string'
              ? []
              : (typeof e === 'boolean' && ((n = e), (e = !1)),
                e ||
                  (g.createHTMLDocument
                    ? (((o = (e = b.implementation.createHTMLDocument('')).createElement('base')).href =
                        b.location.href),
                      e.head.appendChild(o))
                    : (e = b)),
                (i = !n && []),
                (r = D.exec(t))
                  ? [e.createElement(r[1])]
                  : ((r = kt([t], e, i)), i && i.length && C(i).remove(), C.merge([], r.childNodes)));
            let o;
            let r;
            let i;
          }),
          (C.fn.load = function (t, e, n) {
            let o;
            let r;
            let i;
            const a = this;
            const s = t.indexOf(' ');
            return (
              s > -1 && ((o = be(t.slice(s))), (t = t.slice(0, s))),
              v(e) ? ((n = e), (e = void 0)) : e && typeof e === 'object' && (r = 'POST'),
              a.length > 0 &&
                C.ajax({ url: t, type: r || 'GET', dataType: 'html', data: e })
                  .done(function (t) {
                    (i = arguments), a.html(o ? C('<div>').append(C.parseHTML(t)).find(o) : t);
                  })
                  .always(
                    n &&
                      function (t, e) {
                        a.each(function () {
                          n.apply(this, i || [t.responseText, e, t]);
                        });
                      },
                  ),
              this
            );
          }),
          (C.expr.pseudos.animated = function (t) {
            return C.grep(C.timers, function (e) {
              return t === e.elem;
            }).length;
          }),
          (C.offset = {
            setOffset(t, e, n) {
              let o;
              let r;
              let i;
              let a;
              let s;
              let u;
              const l = C.css(t, 'position');
              const c = C(t);
              const d = {};
              l === 'static' && (t.style.position = 'relative'),
                (s = c.offset()),
                (i = C.css(t, 'top')),
                (u = C.css(t, 'left')),
                (l === 'absolute' || l === 'fixed') && (i + u).indexOf('auto') > -1
                  ? ((a = (o = c.position()).top), (r = o.left))
                  : ((a = parseFloat(i) || 0), (r = parseFloat(u) || 0)),
                v(e) && (e = e.call(t, n, C.extend({}, s))),
                e.top != null && (d.top = e.top - s.top + a),
                e.left != null && (d.left = e.left - s.left + r),
                'using' in e ? e.using.call(t, d) : c.css(d);
            },
          }),
          C.fn.extend({
            offset(t) {
              if (arguments.length)
                return void 0 === t
                  ? this
                  : this.each(function (e) {
                      C.offset.setOffset(this, t, e);
                    });
              let e;
              let n;
              const o = this[0];
              return o
                ? o.getClientRects().length
                  ? ((e = o.getBoundingClientRect()),
                    (n = o.ownerDocument.defaultView),
                    { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset })
                  : { top: 0, left: 0 }
                : void 0;
            },
            position() {
              if (this[0]) {
                let t;
                let e;
                let n;
                const o = this[0];
                let r = { top: 0, left: 0 };
                if (C.css(o, 'position') === 'fixed') e = o.getBoundingClientRect();
                else {
                  for (
                    e = this.offset(), n = o.ownerDocument, t = o.offsetParent || n.documentElement;
                    t && (t === n.body || t === n.documentElement) && C.css(t, 'position') === 'static';

                  )
                    t = t.parentNode;
                  t &&
                    t !== o &&
                    t.nodeType === 1 &&
                    (((r = C(t).offset()).top += C.css(t, 'borderTopWidth', !0)),
                    (r.left += C.css(t, 'borderLeftWidth', !0)));
                }
                return {
                  top: e.top - r.top - C.css(o, 'marginTop', !0),
                  left: e.left - r.left - C.css(o, 'marginLeft', !0),
                };
              }
            },
            offsetParent() {
              return this.map(function () {
                for (var t = this.offsetParent; t && C.css(t, 'position') === 'static'; ) t = t.offsetParent;
                return t || at;
              });
            },
          }),
          C.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function (t, e) {
            const n = e === 'pageYOffset';
            C.fn[t] = function (o) {
              return U(
                this,
                function (t, o, r) {
                  let i;
                  if ((y(t) ? (i = t) : t.nodeType === 9 && (i = t.defaultView), void 0 === r)) return i ? i[e] : t[o];
                  i ? i.scrollTo(n ? i.pageXOffset : r, n ? r : i.pageYOffset) : (t[o] = r);
                },
                t,
                o,
                arguments.length,
              );
            };
          }),
          C.each(['top', 'left'], function (t, e) {
            C.cssHooks[e] = Gt(g.pixelPosition, function (t, n) {
              if (n) return (n = Xt(t, e)), It.test(n) ? `${C(t).position()[e]}px` : n;
            });
          }),
          C.each({ Height: 'height', Width: 'width' }, function (t, e) {
            C.each({ padding: `inner${t}`, content: e, '': `outer${t}` }, function (n, o) {
              C.fn[o] = function (r, i) {
                const a = arguments.length && (n || typeof r !== 'boolean');
                const s = n || (!0 === r || !0 === i ? 'margin' : 'border');
                return U(
                  this,
                  function (e, n, r) {
                    let i;
                    return y(e)
                      ? o.indexOf('outer') === 0
                        ? e[`inner${t}`]
                        : e.document.documentElement[`client${t}`]
                      : e.nodeType === 9
                      ? ((i = e.documentElement),
                        Math.max(
                          e.body[`scroll${t}`],
                          i[`scroll${t}`],
                          e.body[`offset${t}`],
                          i[`offset${t}`],
                          i[`client${t}`],
                        ))
                      : void 0 === r
                      ? C.css(e, n, s)
                      : C.style(e, n, r, s);
                  },
                  e,
                  a ? r : void 0,
                  a,
                );
              };
            });
          }),
          C.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], function (t, e) {
            C.fn[e] = function (t) {
              return this.on(e, t);
            };
          }),
          C.fn.extend({
            bind(t, e, n) {
              return this.on(t, null, e, n);
            },
            unbind(t, e) {
              return this.off(t, null, e);
            },
            delegate(t, e, n, o) {
              return this.on(e, t, n, o);
            },
            undelegate(t, e, n) {
              return arguments.length === 1 ? this.off(t, '**') : this.off(e, t || '**', n);
            },
            hover(t, e) {
              return this.mouseenter(t).mouseleave(e || t);
            },
          }),
          C.each(
            'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
              ' ',
            ),
            function (t, e) {
              C.fn[e] = function (t, n) {
                return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e);
              };
            },
          );
        const Qe = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
        (C.proxy = function (t, e) {
          let n;
          let o;
          let r;
          if ((typeof e === 'string' && ((n = t[e]), (e = t), (t = n)), v(t)))
            return (
              (o = s.call(arguments, 2)),
              (r = function () {
                return t.apply(e || this, o.concat(s.call(arguments)));
              }),
              (r.guid = t.guid = t.guid || C.guid++),
              r
            );
        }),
          (C.holdReady = function (t) {
            t ? C.readyWait++ : C.ready(!0);
          }),
          (C.isArray = Array.isArray),
          (C.parseJSON = JSON.parse),
          (C.nodeName = B),
          (C.isFunction = v),
          (C.isWindow = y),
          (C.camelCase = K),
          (C.type = T),
          (C.now = Date.now),
          (C.isNumeric = function (t) {
            const e = C.type(t);
            return (e === 'number' || e === 'string') && !isNaN(t - parseFloat(t));
          }),
          (C.trim = function (t) {
            return t == null ? '' : `${t}`.replace(Qe, '$1');
          }),
          void 0 ===
            (n = function () {
              return C;
            }.apply(e, [])) || (t.exports = n);
        const Je = o.jQuery;
        const Ze = o.$;
        return (
          (C.noConflict = function (t) {
            return o.$ === C && (o.$ = Ze), t && o.jQuery === C && (o.jQuery = Je), C;
          }),
          void 0 === r && (o.jQuery = o.$ = C),
          C
        );
      });
    },
  };
  const e = {};
  function n(o) {
    const r = e[o];
    if (void 0 !== r) return r.exports;
    const i = (e[o] = { exports: {} });
    return t[o].call(i.exports, i, i.exports, n), i.exports;
  }
  (n.n = function (t) {
    const e =
      t && t.__esModule
        ? function () {
            return t.default;
          }
        : function () {
            return t;
          };
    return n.d(e, { a: e }), e;
  }),
    (n.d = function (t, e) {
      for (const o in e) n.o(e, o) && !n.o(t, o) && Object.defineProperty(t, o, { enumerable: !0, get: e[o] });
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.r = function (t) {
      typeof Symbol !== 'undefined' &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    });
  const o = {};
  !(function () {
    n.r(o);
    const t = n(616);
    const e = n.n(t);
    const r = n(167);
    const i = n.n(r);
    o.default = ((window.$ = e()), (0, r.initAll)(), void (window.MOJFrontend = i()));
  })(),
    ((DTFS_TFM = void 0 === DTFS_TFM ? {} : DTFS_TFM).mojFrontend = o);
})();
// # sourceMappingURL=mojFrontend.js.map
