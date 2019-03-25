// http://mafestival.be/blicsm/plugins/cropper-master/docs/


	window.isCrop = false;
	window.arrActions = [];
	window.times = 0;
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
		var $pinhole = $('#pinholebtn');

		/* As soon as slider value changes call applyFilters */
		$('input[type=range]').change(applyFilters);

		function applyFilters() {
			
			if (window.isCrop == true) {
				DestroyCrop();
				$('#savePicture').attr('data-method','getCroppedCanvas')
				$('#savePicture').attr('data-option','save')
				$('#savePicture').closest('.modal-actions').find('.filter-right').addClass('docs-buttons')
			}else{
				$('#savePicture').removeAttr('data-method')
				$('#savePicture').removeAttr('data-option')
				$('#savePicture').closest('.modal-actions').find('.filter-right').removeClass('docs-buttons')
			}
			var bright = parseInt($('#brightness').val());

			Caman('#canvas', img, function () {
				
				this.revert(false);
				this.brightness(bright);
				$('.loading').html('Loading brightness...');
				this.render(function () {
					if (window.isCrop == true) {
						StartCrop();
						$('#savePicture').attr('data-method','getCroppedCanvas')
						$('#savePicture').attr('data-option','save')
						$('#savePicture').closest('.modal-actions').find('.filter-right').addClass('docs-buttons')
					}else{
						$('#savePicture').removeAttr('data-method')
						$('#savePicture').removeAttr('data-option')
						$('#savePicture').closest('.modal-actions').find('.filter-right').removeClass('docs-buttons')
					}
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
					$('#savePicture').removeAttr('disabled')
				});
			});
		}

		$reset.on('click', function (e) {
			$('input[type=range]').val(0);
			
			Caman('#canvas', img, function () {
				this.revert(false);
				this.render();
				DestroyCrop();
				window.isCrop = false;
				// window.times = 0;
				window.arrActions = [];
				$('#savePicture').attr('disabled',true)
			});
		});

		
		/* In built filters */  /* click and pull for range on input element */
		$pinhole.on('click', function (e) {
			
			if (window.isCrop == true) {
				DestroyCrop();
				$('#savePicture').attr('data-method','getCroppedCanvas')
				$('#savePicture').attr('data-option','save')
				$('#savePicture').closest('.modal-actions').find('.filter-right').addClass('docs-buttons')
			}else{
				$('#savePicture').removeAttr('data-method')
				$('#savePicture').removeAttr('data-option')
				$('#savePicture').closest('.modal-actions').find('.filter-right').removeClass('docs-buttons')
			}
			Caman('#canvas', img, function () {
				
				this.pinhole();
				$('.loading').html('Loading sharpen...');
				this.render(function () {
					$('#savePicture').removeAttr('disabled')
					if (window.isCrop == true) {
						StartCrop();
						$('#savePicture').attr('data-method','getCroppedCanvas')
						$('#savePicture').attr('data-option','save')
						$('#savePicture').closest('.modal-actions').find('.filter-right').addClass('docs-buttons')
					}else{
						$('#savePicture').removeAttr('data-method')
						$('#savePicture').removeAttr('data-option')
						$('#savePicture').closest('.modal-actions').find('.filter-right').removeClass('docs-buttons')
					}
					$('.loading').html('Done!')
					setTimeout(function () { $('.loading').html('') }, 1500);
				});
			});
		});

		$('#savePicture').click(function(){
			Caman('#canvas', img, function () {
				canvas.toBlob(function(blob) {
					var formData = new FormData();
					console.log(7, blob)
					formData.append('croppedImage', blob);
					formData.append('image_id', 6290);
					console.log(formData)
					$.ajax({
						url: 'http://beta.oogquay.com/users/dentist/ajaxSaveImageRevision.html',	
            			type: "POST",
						data: formData,
						dataType: 'json',
						processData: false,
						contentType: false,

						success: function (response) {
							$("#savePicture").removeAttr("disabled")
							console.log(response)
							console.log('Upload success');
							// $('#myModalCanvas').modal('hide');
							// // update new image
							// $('.viewport img').each(function () {
							// 	var text = $(this).attr('src');
							// 	var data_image_old = $('.data-image-old').text()
							// 	console.log(text, data_image_old, text == data_image_old)
							// 	text = text.replace(data_image_old, response.path);

							// 	$(this).attr('src', text)
							// });
							// $('.data-image-' + response.image_id).find('.reponsive-block').find('.reponsive-block').find('.img-case-view').attr('src', response.path)
							// $('.data-image-' + response.image_id).find('.edit-image-btn').attr('data-imgvalue', response.path)
						},
						error: function () {
							console.log('Upload error');
						}
					});
				});
			})
		})

		//end caman===============================================================================================


		$('#actionEdit').on('click', function () {
			$('#myModalCanvas').modal('show');
		})

		//check modal hide -> destroy crop and revert canmanjs
		$('#myModalCanvas').on('hidden.bs.modal', function (e) {
			$('input[type=range]').val(0);

			Caman('#canvas', img, function () {
				this.revert(false);
				this.render();
				DestroyCrop();
				window.isCrop = false;
			});
		})

		var console = window.console || { log: function () { } };
		var $imageCanvas = $('#canvas');
		var originalImageURL = $('#picture').attr('src');
		var uploadedImageURL;

		var options = {
			viewMode: 1,
			aspectRatio:4 / 3,
			minContainerWidth: 500,
			minContainerHeight: 300,
		};

		function StartCrop() {
			window.isCrop = true;
			$imageCanvas.cropper(options);
		}
		function DestroyCrop() {
			window.arrActions = [];
			$imageCanvas.cropper('destroy');
			console.log('destroy')
		}
		
		//click ratio 4/3, 16/9...
		$('.docs-toggles').on('click', function () {
			StartCrop();
			window.isCrop = true;
			if(window.isCrop){
				$('#savePicture').removeAttr('disabled')
				if(!$('#savePicture').attr('data-method') && !$('#savePicture').attr('data-option')){
					$('#savePicture').attr('data-method','getCroppedCanvas')
					$('#savePicture').attr('data-option','save');
					$('#savePicture').closest('.modal-actions').find('.filter-right').addClass('docs-buttons')
				}
			}
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

			// isCheckbox = target.type === 'checkbox';
			// isRadio = target.type === 'radio';

			// if (isCheckbox || isRadio) {
			// 	if (isCheckbox) {
			// 		options[target.name] = target.checked;
			// 		cropBoxData = cropper.getCropBoxData();
			// 		canvasData = cropper.getCanvasData();

			// 		options.ready = function () {
			// 			// console.log('ready');
			// 			cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
			// 		};
			// 	} else {
			// 		options[target.name] = target.value;
			// 		options.ready = function () {
			// 			// console.log('ready');
			// 		};
			// 	}

			// 	// Restart
			// 	DestroyCrop()
			// 	StartCrop()
			// }
			cropBoxData = cropper.getCropBoxData();
			canvasData = cropper.getCanvasData();
			DestroyCrop()
			StartCrop()
		});

		
		$('.docs-buttons').on('click', '[data-method]', function () {
			window.times ++;
			var result;
			window.isCrop = true;
			if (window.isCrop) {
				$('#savePicture').removeAttr('disabled')
				if (!$('#savePicture').attr('data-method') && !$('#savePicture').attr('data-option')) {
					$('#savePicture').attr('data-method', 'getCroppedCanvas')
					$('#savePicture').attr('data-option', 'save');
					$('#savePicture').closest('.modal-actions').find('.filter-right').addClass('docs-buttons')
				}
			}
			
			if(window.times == 1){
				
				var method = $(this).attr('data-method');
				var option = $(this).attr('data-option');
				$imageCanvas.cropper({
					...options,
					ready: function (e) {
						switch (method) {
							case 'rotate':
								result = this.cropper.rotate(option);
								console.log('rotate',result)
								break;

							case 'scaleX':
								result = this.cropper.scaleX(option);
								$(this).data('option', -option);
								console.log('scaleX',result)
								break;

							case 'scaleY':
								result = this.cropper.scaleY(option);
								$(this).data('option', -option);
								console.log('scaleY',result)
								break;
							case 'getCroppedCanvas':
								result = this.cropper.getCroppedCanvas(option);
								console.log('getCroppedCanvas',result)
								if (result) {
									result.id = 'canvasResult';
									// console.log(result)

									if (option == 'save') {
										if (typeof $imageCanvas.toBlob !== "undefined") {
											$imageCanvas.toBlob(function (blob) {
												var formData = new FormData();
												console.log(7, blob)
												formData.append('croppedImage', blob);
												formData.append('image_id', 6290);
												console.log(formData)
												$.ajax({
													url: 'http://beta.oogquay.com/users/dentist/ajaxSaveImageRevision.html',
													type: "POST",
													data: formData,
													dataType: 'json',
													processData: false,
													contentType: false,

													success: function (response) {
														$("#savePicture").removeAttr("disabled")
														console.log(response)
														console.log('Upload success');
														// $('#myModalCanvas').modal('hide');
														// // update new image
														// $('.viewport img').each(function () {
														// 	var text = $(this).attr('src');
														// 	var data_image_old = $('.data-image-old').text()
														// 	console.log(text, data_image_old, text == data_image_old)
														// 	text = text.replace(data_image_old, response.path);

														// 	$(this).attr('src', text)
														// });
														// $('.data-image-' + response.image_id).find('.reponsive-block').find('.reponsive-block').find('.img-case-view').attr('src', response.path)
														// $('.data-image-' + response.image_id).find('.edit-image-btn').attr('data-imgvalue', response.path)
													},
													error: function () {
														console.log('Upload error');
													}
												});
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
						}
					},
				})
				
			}else{
				StartCrop();
				var $this = $(this);
				// console.log($this)

				var data = $this.data();
				// console.log(data)

				var cropper = $imageCanvas.data('cropper');
				// console.log(cropper)

				var cropped;
				// console.log('method:',data.method)

				if ($this.prop('disabled') || $this.hasClass('disabled')) {
					return;
				}

				cropped = cropper.cropped;

				if (cropper && data.method) {
					data = $.extend({}, data);
					
					switch (data.method) {
						case 'zoom':
							cropper.crop();
							result = $imageCanvas.cropper(data.method, data.option);
							// console.log(2,result);
							window.arrActions.push(result[0])
							break;

						case 'rotate':
							result = $imageCanvas.cropper(data.method, data.option);
							// console.log(2,result);
							window.arrActions.push(result[0])
							break;

						case 'scaleX':
							result = $imageCanvas.cropper(data.method, data.option);
							$(this).data('option', -data.option);
							// console.log(2,result);
							window.arrActions.push(result[0])
							break;

						case 'scaleY':
							result = $imageCanvas.cropper(data.method, data.option);
							$(this).data('option', -data.option);
							// console.log(2,result);
							window.arrActions.push(result[0])
							break;

						case 'getCroppedCanvas':
							result = $imageCanvas.cropper(data.method, data.option);
							// console.log(2,result)
							if (result) {
								result.id = 'canvasResult';

								if (data.option == 'save') {
									if (typeof $imageCanvas.toBlob !== "undefined") {
										$imageCanvas.toBlob(function (blob) {
											var formData = new FormData();
											console.log(7, blob)
											formData.append('croppedImage', blob);
											formData.append('image_id', 6290);
											console.log(formData)
											$.ajax({
												url: 'http://beta.oogquay.com/users/dentist/ajaxSaveImageRevision.html',
												type: "POST",
												data: formData,
												dataType: 'json',
												processData: false,
												contentType: false,

												success: function (response) {
													$("#savePicture").removeAttr("disabled")
													console.log(response)
													console.log('Upload success');
													// $('#myModalCanvas').modal('hide');
													// // update new image
													// $('.viewport img').each(function () {
													// 	var text = $(this).attr('src');
													// 	var data_image_old = $('.data-image-old').text()
													// 	console.log(text, data_image_old, text == data_image_old)
													// 	text = text.replace(data_image_old, response.path);

													// 	$(this).attr('src', text)
													// });
													// $('.data-image-' + response.image_id).find('.reponsive-block').find('.reponsive-block').find('.img-case-view').attr('src', response.path)
													// $('.data-image-' + response.image_id).find('.edit-image-btn').attr('data-imgvalue', response.path)
												},
												error: function () {
													console.log('Upload error');
												}
											});
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
								$image.attr('src', originalImageURL);
							}
							break;
					}
					// console.log(window.arrActions)
				
				} else {
					console.log('out scope')
				}

				
			}

		});

		$('#undo').click(function(){
			console.log(window.arrActions)
			console.log(window.arrActions.length);
			$imageCanvas = window.arrActions[length]

		})
	})


	

