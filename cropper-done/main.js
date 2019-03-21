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

		var $resize = $('#resizebtn');
		var $crop = $('#cropbtn');

		var $reset = $('#resetbtn');
		var $brightness = $('.brightnessbtn');

		var $noise = $('#noisebtn');
		var $sepia = $('#sepiabtn');
		var $contrast = $('#contrastbtn');
		var $color = $('#colorbtn');

		var $vintage = $('#vintagebtn');
		var $lomo = $('#lomobtn');
		var $emboss = $('#embossbtn');
		var $tiltshift = $('#tiltshiftbtn');
		var $radialblur = $('#radialblurbtn');
		var $edgeenhance = $('#edgeenhancebtn');

		var $posterize = $('#posterizebtn');
		var $clarity = $('#claritybtn');
		var $orangepeel = $('#orangepeelbtn');
		var $sincity = $('#sincitybtn');
		var $sunrise = $('#sunrisebtn');
		var $crossprocess = $('#crossprocessbtn');

		var $hazydays = $('#hazydaysbtn');
		var $love = $('#lovebtn');
		var $grungy = $('#grungybtn');
		var $jarques = $('#jarquesbtn');
		var $pinhole = $('#pinholebtn');
		var $sharpen = $('.sharpenbtn');
		var $oldboot = $('#oldbootbtn');
		var $glowingsun = $('#glowingsunbtn');

		var $hdr = $('#hdrbtn');
		var $oldpaper = $('#oldpaperbtn');
		var $pleasant = $('#pleasantbtn');

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

		/* Creating custom filters */
		Caman.Filter.register("oldpaper", function () {
			this.pinhole();
			this.noise(10);
			this.orangePeel();
			this.render();
		});

		Caman.Filter.register("pleasant", function () {
			this.colorize(60, 105, 218, 10);
			this.contrast(10);
			this.sunrise();
			this.hazyDays();
			this.render();
		});

		$reset.on('click', function (e) {
			$('input[type=range]').val(0);

			Caman('#canvas', img, function () {
				this.revert(false);
				this.render();
				DestroyCrop();
				// StartCrop();
				$('.preview-right').hide();
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

		$noise.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.noise(10);

				$('.loading').html('Loading...')
				DestroyCrop();
				this.render(function () {
					StartCrop();
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$contrast.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.contrast(10);

				$('.loading').html('Loading...')
				DestroyCrop();
				this.render(function () {
					StartCrop();
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$sepia.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.sepia(20);

				$('.loading').html('Loading...')
				DestroyCrop();
				this.render(function () {
					StartCrop();
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$color.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.colorize(60, 105, 218, 10);

				$('.loading').html('Loading...')
				DestroyCrop();
				this.render(function () {
					StartCrop();
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$vintage.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.vintage();

				$('.loading').html('Loading...')
				DestroyCrop();
				this.render(function () {
					StartCrop();
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$lomo.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.lomo();

				$('.loading').html('Loading...');
				DestroyCrop();
				this.render(function () {
					StartCrop();
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$emboss.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.emboss();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$tiltshift.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.tiltShift({
					angle: 90,
					focusWidth: 600
				});

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$radialblur.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.radialBlur();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$edgeenhance.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.edgeEnhance();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$posterize.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.posterize(8, 8);

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$clarity.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.clarity();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$orangepeel.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.orangePeel();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$sincity.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.sinCity();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$sunrise.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.sunrise();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$crossprocess.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.crossProcess();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$love.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.love();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$grungy.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.grungy();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$jarques.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.jarques();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});


		$pinhole.on('click', function (e) {
			Caman('#canvas', img, function () {
				DestroyCrop();
				this.sharpenbtn();
				$('.loading').html('Loading Pin...');
				this.render(function () {
					StartCrop();
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$oldboot.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.oldBoot();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$glowingsun.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.glowingSun();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$hazydays.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.hazyDays();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		/* Calling multiple filters inside same function */
		$hdr.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.contrast(10);
				this.contrast(10);
				this.jarques();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		/* Custom filters that we created */
		$oldpaper.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.oldpaper();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$pleasant.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.pleasant();

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$resize.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.resize({
					width: 900,
					height: 800
				});
				// You still have to call render!

				$('.loading').html('Loading...')
				this.render(function () {
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$crop.on('click', function (e) {
			Caman('#canvas', img, function () {
				this.crop(500, 300);
				// Still have to call render!

				$('.loading').html('Loading...')
				this.render(function () {
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
			// $('#actionEdit').click(function(){
			$('#myModal').modal('show');
			// StartCrop();

			if (cropped) {
				var $this = $(this);
				// console.log($this)

				var data = $this.data();
				// console.log(data)

				var cropper = $imageCanvas.data('cropper');
				var cropped;
				var result;

				cropped = cropper.cropped;

				setTimeout(() => {
					if ($this.prop('disabled') || $this.hasClass('disabled')) {
						return;
					}

					cropped = cropper.cropped;

					if (cropper && data.method) {
						data = $.extend({}, data);

						if (uploadedImageType === 'image/jpeg') {
							if (!data.option) {
								data.option = {};
							}
							data.option.fillColor = '#fff';
						}
						result = $imageCanvas.cropper(data.method, data.option, data.secondOption);
						if (result) {
							result.id = 'canvasResult';
							// preview picture
							$('#resultCanvas').html(result);
						}
					}
				}, 500);

			}
		})

		//check modal hide -> destroy crop and revert canmanjs
		$('#myModal').on('hidden.bs.modal', function (e) {
			$('input[type=range]').val(0);

			Caman('#canvas', img, function () {
				this.revert(false);
				this.render();
				DestroyCrop();
				$('#resultCanvas').html('');

			});
			window.isCrop = false
		})

		var console = window.console || { log: function () { } };
		var URL = window.URL || window.webkitURL;
		var $image = $('#picture');
		var $imageCanvas = $('#canvas');


		var URL = window.URL || window.webkitURL;

		var options = {
			viewMode: 1,
			aspectRatio: 16 / 9,
			minContainerWidth: 500,
			minContainerHeight: 300,
		};
		var originalImageURL = $image.attr('src');
		var uploadedImageName = 'cropped.jpg';
		var uploadedImageType = 'image/jpeg';
		var uploadedImageURL;

		function StartCrop() {
			window.isCrop = true;
			$imageCanvas.on({
				ready: function (e) {
					// console.log(e.type);
				},
				cropstart: function (e) {
					// console.log(e.type, e.detail.action);
				},
				cropmove: function (e) {
					// console.log(e.type, e.detail.action);
				},
				cropend: function (e) {
					// console.log(e.type, e.detail.action);
				},
				crop: function (e) {
					// console.log(e)
				},
				zoom: function (e) {
					// console.log(e.type, e.detail.ratio);
				}
			}).cropper(options);
		}
		function DestroyCrop() {
			// console.log('destroy crop')
			$imageCanvas.on().cropper('destroy');
		}


		// Buttons
		if (!$.isFunction(document.createElement('canvas').getContext)) {
			$('button[data-method="getCroppedCanvas"]').prop('disabled', true);
		}


		if (typeof document.createElement('cropper').style.transition === 'undefined') {
			$('button[data-method="rotate"]').prop('disabled', true);
			$('button[data-method="scale"]').prop('disabled', true);
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
		// Methods
		$('.docs-buttons').on('click', '[data-method]', function () {

			StartCrop();
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

				if (typeof data.target !== 'undefined') {
					$target = $(data.target);

					if (typeof data.option === 'undefined') {
						try {
							data.option = JSON.parse($target.val());
						} catch (e) {
							console.log(e.message);
						}
					}
				}

				switch (data.method) {
					case 'rotate':
						console.log('rotate 1')
						if (cropped && options.viewMode > 0) {
							$imageCanvas.cropper('clear');
							// $imageCanvas.on('rotate').cropper(data.option);
						}

						break;

					case 'getCroppedCanvas':
						// console.log(data)
						if (data.option == 'save') {
							break;
						} else {
							if (uploadedImageType === 'image/jpeg') {
								if (!data.option) {
									data.option = {};
								}
								data.option.fillColor = '#fff';
							}
						}
						break;
				}

				result = $imageCanvas.cropper(data.method, data.option, data.secondOption);
				console.log(data.option)
				switch (data.method) {
					case 'rotate':
						$imageCanvas.cropper('crop');
						break;

					case 'scaleX':
					case 'scaleY':
						$(this).data('option', -data.option);
						break;

					case 'getCroppedCanvas':
						if (result) {
							// console.log(result)
							//add id attribute
							// result.id = 'canvasResult';
							// console.log(data.option,data.method)

							// preview picture
							// $('.preview-right').show()
							// $('#resultCanvas').html(result);
							// console.log( 'getCroppedCanvas Result',result);

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
						if (uploadedImageURL) {
							URL.revokeObjectURL(uploadedImageURL);
							uploadedImageURL = '';
							$imageCanvas.attr('src', originalImageURL);
						}

						break;
				}

				if ($.isPlainObject(result) && $target) {
					try {
						$target.val(JSON.stringify(result));
					} catch (e) {
						console.log(e.message);
					}
				}
			} else {
				console.log('out scope')
			}

		});
	})


	

