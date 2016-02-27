<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\User;

class UsersController extends Controller {
	public function getIndex() {
		$users = User::select([
			'id', 'name', 'email'
		])->paginate(25);

		return response()->json($users);
	}

	public function getUser($id) {
		$user = User::find($id);

		return response()->json(['data' => $user]);
	}
}