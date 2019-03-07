$(function () {
	'use strict';

	// caman
	var canvas = document.getElementById('canvas');

	/* Enable Cross Origin Image Editing */
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.crossOrigin = '';
	img.src = './test.jpg';

	img.onload = function () {
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0, img.width, img.height);
	}

	var $resize = $('#resizebtn');
	var $crop = $('#cropbtn');

	var $reset = $('#resetbtn');
	var $brightness = $('#brightnessbtn');

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
		});
		DestroyCrop();
	});

	/* In built filters */  /* click and pull for range on input element */
	$brightness.on('click', function (e) {
		Caman('#canvas', function () {
			this.brightness(30).render();
		});
	});

	$noise.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.noise(10).render();
		});
	});

	$contrast.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.contrast(10).render();
		});
	});

	$sepia.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.sepia(20).render();
		});
	});

	$color.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.colorize(60, 105, 218, 10).render();
		});
	});

	$vintage.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.vintage().render();
		});
	});

	$lomo.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.lomo().render();
		});
	});

	$emboss.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.emboss().render();
		});
	});

	$tiltshift.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.tiltShift({
				angle: 90,
				focusWidth: 600
			}).render();
		});
	});

	$radialblur.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.radialBlur().render();
		});
	});

	$edgeenhance.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.edgeEnhance().render();
		});
	});

	$posterize.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.posterize(8, 8).render();
		});
	});

	$clarity.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.clarity().render();
		});
	});

	$orangepeel.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.orangePeel().render();
		});
	});

	$sincity.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.sinCity().render();
		});
	});

	$sunrise.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.sunrise().render();
		});
	});

	$crossprocess.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.crossProcess().render();
		});
	});

	$love.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.love().render();
		});
	});

	$grungy.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.grungy().render();
		});
	});

	$jarques.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.jarques().render();
		});
	});

	$pinhole.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.pinhole().render();
		});
	});

	$oldboot.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.oldBoot().render();
		});
	});

	$glowingsun.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.glowingSun().render();
		});
	});

	$hazydays.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.hazyDays().render();
		});
	});

	/* Calling multiple filters inside same function */
	$hdr.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.contrast(10);
			this.contrast(10);
			this.jarques();
			this.render();
		});
	});

	/* Custom filters that we created */
	$oldpaper.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.oldpaper();
			this.render();
		});
	});

	$pleasant.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.pleasant();
			this.render();
		});
	});

	$resize.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.resize({
				width: 900,
				height: 800
			});
			// You still have to call render!
			this.render()
		});
	});

	$crop.on('click', function (e) {
		Caman('#canvas', img, function () {
			this.crop(500, 300);
			// Still have to call render!
			this.render();
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


	// -------------------------------------------------------------------------------

	var console = window.console || { log: function () { } };
	var URL = window.URL || window.webkitURL;
	var $image = $('#picture');
	var $imageCanvas = $('#canvas');
	var $download = $('#download');
	var $dataX = $('#dataX');
	var $dataY = $('#dataY');
	var $dataHeight = $('#dataHeight');
	var $dataWidth = $('#dataWidth');
	var $dataRotate = $('#dataRotate');
	var $dataScaleX = $('#dataScaleX');
	var $dataScaleY = $('#dataScaleY');
	var options = {
		aspectRatio: 16 / 9,
		preview: '.img-preview',
		crop: function (e) {
			$dataX.val(Math.round(e.detail.x));
			$dataY.val(Math.round(e.detail.y));
			$dataHeight.val(Math.round(e.detail.height));
			$dataWidth.val(Math.round(e.detail.width));
			$dataRotate.val(e.detail.rotate);
			$dataScaleX.val(e.detail.scaleX);
			$dataScaleY.val(e.detail.scaleY);
		}
	};
	var originalImageURL = $image.attr('src');
	var uploadedImageName = 'cropped.jpg';
	var uploadedImageType = 'image/jpeg';
	var uploadedImageURL;



	// $('#cropCropper').on('click', function () {
	// 	StartCrop();
	// })

	$('.cropperAction').on('click', function () {
		var $this = $(this);

		var method = $this.attr('data-method');
		var option = $this.attr('data-option');

		console.log(method, option);

		switch (method) {
			case 'crop':
				// code block	
				StartCrop()
				break;

			case 'zoom':
				// code block
				if(option > 0){
					Zoom('zoom',0.1)
				}else{
					Zoom('zoom',-0.1)
				}
				break;
		
			case 'rotate':
				// code block
				if(option > 0){
					Zoom('rotate',45)
				}else{
					Rotate('rotate',-45)
				}
				break;

		}
	})



	// FUNCTION ON CROPPER=================================================================         
	function StartCrop() {
		console.log('start crop')
		$imageCanvas.on({
			ready: function (e) {
				// console.log('e.type = ready', e.type);
			},
			cropstart: function (e) {
				// console.log('e.type = cropstart', e.type, e.detail.action);
			},
			cropmove: function (e) {
				// console.log('e.type = cropmove', e.type, e.detail.action);
			},
			cropend: function (e) {
				// console.log('e.type = cropend', e.type, e.detail.action);
			},
			crop: function (e) {
				// console.log('e.type = crop', e.type);
			},
			zoom: function (e) {
				// console.log('e.type = zoom', e.type, e.detail.ratio);
			}
		}).cropper(options);
	}

	function Zoom(method,option) {
		// console.log('zoom')
		$imageCanvas.on().cropper(method, option);
	}

	function Rotate(method,option) {
		// console.log('zoom')
		$imageCanvas.on().cropper(method, option);
	}

	function DestroyCrop() {
		// console.log('destroy crop')
		$imageCanvas.on().cropper('destroy');
	}
	// FUNCTION ON CROPPER================================================================= 


//================================================================================================================================== ================================================================= ================================================================= ================================================================= 


	// Buttons
	if (!$.isFunction(document.createElement('canvas').getContext)) {
		$('button[data-method="getCroppedCanvas"]').prop('disabled', true);
	}


	if (typeof document.createElement('cropper').style.transition === 'undefined') {
		$('button[data-method="rotate"]').prop('disabled', true);
		$('button[data-method="scale"]').prop('disabled', true);
	}

	// Methods
	$('.docs-buttons').on('click', '[data-method]', function () {
		var $this = $(this);
		var data = $this.data();
		var cropper = $image.data('cropper');
		var cropped;
		var $target;
		var result;

		if ($this.prop('disabled') || $this.hasClass('disabled')) {
			return;
		}

		if (cropper && data.method) {
			data = $.extend({}, data); // Clone a new one

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

			cropped = cropper.cropped;

			switch (data.method) {
				case 'rotate':
					if (cropped && options.viewMode > 0) {
						$image.cropper('clear');
					}

					break;

				case 'getCroppedCanvas':
					if (uploadedImageType === 'image/jpeg') {
						if (!data.option) {
							data.option = {};
						}

						data.option.fillColor = '#fff';
					}

					break;
			}

			result = $image.cropper(data.method, data.option, data.secondOption);

			switch (data.method) {
				case 'rotate':
					if (cropped && options.viewMode > 0) {
						$image.cropper('crop');
					}

					break;

				case 'scaleX':
				case 'scaleY':
					$(this).data('option', -data.option);
					break;

				case 'getCroppedCanvas':
					if (result) {
						//add id attribute
						result.id = 'canvas';

						// Bootstrap's Modal
						$('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
						console.log(result);

						if (!$download.hasClass('disabled')) {
							download.download = uploadedImageName;
							$download.attr('href', result.toDataURL(uploadedImageType));
						}
					}

					break;

				case 'destroy':
					if (uploadedImageURL) {
						URL.revokeObjectURL(uploadedImageURL);
						uploadedImageURL = '';
						$image.attr('src', originalImageURL);
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
		}
	});


});