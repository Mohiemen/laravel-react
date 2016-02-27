<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\NewsArticle;

class NewsController extends Controller {
	public function getIndex() {
		$articles = NewsArticle::select([
			'id', 'title', 'excerpt', 'content', 'author_id', 'category_id', 'created_at', 'updated_at'
		])->paginate(25);

		return response()->json($articles);
	}

	public function getArticle($id) {
		$article = NewsArticle::find($id);

		return response()->json(['data' => $article]);
	}

	public function postArticleMakeSlug() {
		$slug = request()->input('slug');
		$checked = $this->_findUsableSlug($slug);

		return response()->json(['slug' => $checked]);
	}

	public function postUpload() {
		$file = request()->file('file');

		if($file->isValid()) {
			$filename = str_random() . $file->getClientOriginalExtension();
			$file->move('uploads', $filename);

			$response = ['status' => 'success', 'url' => 'uploads/' . $filename];
		} else {
			$response = ['status' => 'failure', 'message' => 'Invalid file uploaded.'];
		}

		return response()->json($response);
	}

	private function _findUsableSlug($slug, $times=0) {
		$slug = strtolower($slug);
		$count = NewsArticle::where(['slug' => $slug])->count();
		if($count) {
			return $this->_findUsableSlug($slug . '-' . str_random(5));
		}
		return $slug;
	}
}