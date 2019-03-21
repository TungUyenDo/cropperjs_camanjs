// http://mafestival.be/blicsm/plugins/cropper-master/docs/


	window.isCrop = false;
	$(document).ready(function(){
		// caman===============================================================================================
		var canvas = document.getElementById('canvas');

		/* Enable Cross Origin Image Editing */
		var ctx = canvas.getContext('2d');
		var img = new Image();
		img.crossOrigin = '';
		img.src = $('#picture').attr('src');

		img.onload = function () {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0, img.width, img.height);
		}

		var $reset = $('#resetbtn');
		var $brightness = $('.brightnessbtn');
		var $sharpen = $('.sharpenbtn');
		var $save = $('#savebtn');

		/* As soon as slider value changes call applyFilters */
		$('input[type=range]').change(applyFilters);

		function applyFilters() {
			var hue = parseInt($('#hue').val());
			var cntrst = parseInt($('#contrast').val());
			var vibr = parseInt($('#vibrance').val());
			var sep = parseInt($('#sepia').val());

			Caman('#canvas', img, function () {
				this.revert(false);
				this.hue(hue).contrast(cntrst).vibrance(vibr).sepia(sep).render();
			});
		}

		$reset.on('click', function (e) {
			$('input[type=range]').val(0);

			Caman('#canvas', img, function () {
				this.revert(false);
				this.render();
				DestroyCrop();
				window.isCrop = false;
			});
		});
		var i_brightness = 0;
		/* In built filters */  /* click and pull for range on input element */
		$brightness.on('click', function (e) {
			var method = $(this).attr('data-method');

			if (window.isCrop == true) {
				DestroyCrop();
			}

			Caman('#canvas', function () {
				if (method == 'plus') {
					this.revert(false);
					this.render();
					i_brightness = i_brightness + 10;
				}
				else {
					this.revert(false);
					this.render();
					i_brightness = i_brightness - 10;
				}
				this.brightness(i_brightness);

				$('.loading').html('Loading...');

				this.render(function () {
					if (window.isCrop == true) {
						StartCrop();
					}
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});

			});
		});
		var i_sharpen = 0;
		/* In built filters */  /* click and pull for range on input element */
		$sharpen.on('click', function (e) {
			var method = $(this).attr('data-method');

			if (window.isCrop == true) {
				DestroyCrop();
			}
			Caman('#canvas', img, function () {
				// DestroyCrop();

				if (method == 'plus') {
					this.revert(false);
					this.render();
					i_sharpen = i_sharpen + 10;
				}
				else {
					this.revert(false);
					this.render();
					i_sharpen = i_sharpen - 10;
				}
				this.sharpen(i_sharpen);
				$('.loading').html('Loading sharpen...');
				this.render(function () {
					if (window.isCrop == true) {
						StartCrop();
					}
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		/* You can also save it as a jpg image, extension need to be added later after saving image. */

		$save.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.render(function () {
					this.save('png');
				});
			});
		});


		//end caman===============================================================================================


		$('#actionEdit').on('click', function () {
			$('#myModal').modal('show');
		})

		//check modal hide -> destroy crop and revert canmanjs
		$('#myModal').on('hidden.bs.modal', function (e) {
			$('input[type=range]').val(0);

			Caman('#canvas', img, function () {
				this.revert(false);
				this.render();
				DestroyCrop();
			});
			window.isCrop = false;
			window.times = 0;
		})

		var console = window.console || { log: function () { } };
		var URL = window.URL || window.webkitURL;
		var $imageCanvas = $('#canvas');
		var originalImageURL = $('picture').attr('src');

		var options = {
			viewMode: 1,
			aspectRatio: 16 / 9,
			minContainerWidth: 500,
			minContainerHeight: 300,
		};
		var uploadedImageType = 'image/jpeg';
		var uploadedImageURL;

		function StartCrop() {
			window.isCrop = true;
			$imageCanvas.on().cropper(options);
		}
		function DestroyCrop() {
			$imageCanvas.on().cropper('destroy');
			$imageCanvas.attr('src', originalImageURL);
			console.log('destroy')
		}
		
		// docs-toggles
		$('.docs-toggles').on('click', function () {
			StartCrop();

			var e = event || window.event;
			var target = e.target || e.srcElement;
			var cropBoxData;
			var canvasData;
			var isCheckbox;
			var isRadio;
			var cropper = $imageCanvas.data('cropper');
			if (!cropper) {
				return;
			}

			if (target.tagName.toLowerCase() === 'label') {
				target = target.querySelector('input');
			}

			isCheckbox = target.type === 'checkbox';
			isRadio = target.type === 'radio';

			if (isCheckbox || isRadio) {
				if (isCheckbox) {
					options[target.name] = target.checked;
					cropBoxData = cropper.getCropBoxData();
					canvasData = cropper.getCanvasData();

					options.ready = function () {
						// console.log('ready');
						cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
					};
				} else {
					options[target.name] = target.value;
					options.ready = function () {
						// console.log('ready');
					};
				}

				// Restart
				DestroyCrop()
				StartCrop()
			}
		});


		window.arrActions = [];

		// Methods
		window.times = 0;
		$('.docs-buttons').on('click', '[data-method]', function () {
			window.times ++;
			if(window.times == 1){
				var option = $(this).attr('data-option')
				$imageCanvas.on({
					ready:function(){
						switch(data.method){
							case 'rotate':
								this.cropper.rotate(option)
								break;

							case 'scaleX':
								this.cropper.scale(option, -option);
								break;

							case 'scaleY':
							this.cropper.scale(-option, option);
								break;

							case 'zoom':
								this.cropper.zoom(option);
								break;
						}
					}
				}).cropper(options);
			}else{
				StartCrop()
			}

			
			var $this = $(this);
			// console.log($this)

			var data = $this.data();
			// console.log(data)

			var cropper = $imageCanvas.data('cropper');
			// console.log(cropper)

			var cropped;
			var $target;
			var result;

			// console.log('method:',data.method)

			if ($this.prop('disabled') || $this.hasClass('disabled')) {
				return;
			}

			cropped = cropper.cropped;

			if (cropper && data.method) {
				data = $.extend({}, data);

				result = $imageCanvas.cropper(data.method, data.option, data.secondOption);

				window.arrActions.push(result)
				console.log(window.arrActions)
				
				switch (data.method) {
					case 'rotate':
						$imageCanvas.cropper('crop');
						break;

					case 'scaleX':
						$imageCanvas.cropper('scale',data.option, -data.option);
						break;

					case 'scaleY':
						$imageCanvas.cropper('scale',-data.option, data.option);
						break;

					case 'getCroppedCanvas':
						if (result) {
							result.id = 'canvasResult';
							// console.log(result)

							if (data.option == 'save') {
								if (typeof $imageCanvas.toBlob !== "undefined") {
									$imageCanvas.toBlob(function (blob) {
										console.log(blob)
										// send the blob to server etc.
										// var formData = new FormData();

										// formData.append('croppedImage', blob);

										// $.ajax('upload.php', {
										// 	method: "POST",
										// 	data: formData,
										// 	processData: false,
										// 	contentType: false,
										// 	success: function () {
										// 		console.log('Upload success');
										// 		$('#myModal').modal('hide');
										// 	},
										// 	error: function () {
										// 		console.log('Upload error');
										// 	}
										// });
									}, "image/jpeg", 0.75);
								}
								else if (typeof $imageCanvas.msToBlob !== "undefined") {
									var blob = $imageCanvas.msToBlob()
									// send blob
								}
								else {
									// manually convert Data-URI to Blob (if no polyfill)
								}
							}
						}
						break;

					case 'destroy':
						$imageCanvas.attr('src', originalImageURL);
						break;
				}
			} else {
				console.log('out scope')
			}

		});
	})


	

