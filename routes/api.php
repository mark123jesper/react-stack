<?php

//use App\Http\Controllers\AuthController;
use App\Http\Controllers\TokenAuthController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\ConfirmablePasswordController;
use Laravel\Fortify\Http\Controllers\ConfirmedPasswordStatusController;
use Laravel\Fortify\Http\Controllers\ConfirmedTwoFactorAuthenticationController;
use Laravel\Fortify\Http\Controllers\EmailVerificationNotificationController;
use Laravel\Fortify\Http\Controllers\EmailVerificationPromptController;
use Laravel\Fortify\Http\Controllers\NewPasswordController;
use Laravel\Fortify\Http\Controllers\PasswordController;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;
use Laravel\Fortify\Http\Controllers\ProfileInformationController;
use Laravel\Fortify\Http\Controllers\RecoveryCodeController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;
use Laravel\Fortify\Http\Controllers\TwoFactorAuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\TwoFactorAuthenticationController;
use Laravel\Fortify\Http\Controllers\TwoFactorQrCodeController;
use Laravel\Fortify\Http\Controllers\VerifyEmailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//Route::middleware(['auth:sanctum', 'verified'])->get('/user', function () {
//    return new UserResource(Auth::user());
//});

Route::group(['middleware' => 'auth:sanctum', 'prefix' => '/'], function () {
    Route::get('/user', function () {
        return new UserResource(Auth::user());
    });
    /*
     * Logout Route for Mobile App (Sanctum Token-based Authentication)
     */
    Route::delete('/auth/token', [TokenAuthController::class, 'destroy']);
});
/*
 * Login Route for Mobile App (Sanctum Token-based Authentication)
 */
Route::group(['middleware' => 'guest', 'prefix' => '/'], function () {
    Route::post('/auth/token', [TokenAuthController::class, 'store']);
});

/*
 * Route only for Sanctum Authentication
 */
//Route::post('/login', [AuthController::class, 'login']);
//Route::post('/logout', [AuthController::class, 'logout']);

/*
 * Route for Sanctum and FOrtify Authentication
 */

//$limiter = config('fortify.limiters.login');
//$twoFactorLimiter = config('fortify.limiters.two-factor');
//$verificationLimiter = config('fortify.limiters.verification', '6,1');
//$enableViews = config('fortify.views', true);
//
//// Login...
//Route::post('/login', [AuthenticatedSessionController::class, 'store'])
//    ->middleware(array_filter([
//        'guest:' . config('fortify.guard'),
//        $limiter ? 'throttle:' . $limiter : null,
//    ]));
//
//// Two Factor Authentication...
//Route::post('/two-factor-challenge', [TwoFactorAuthenticatedSessionController::class, 'store'])
//    ->middleware(array_filter([
//        'guest:' . config('fortify.guard'),
//        $twoFactorLimiter ? 'throttle:' . $twoFactorLimiter : null,
//    ]));
//
//// Registration...
//if (Features::enabled(Features::registration())) {
//    Route::post('/register', [RegisteredUserController::class, 'store'])
//        ->middleware(['guest:' . config('fortify.guard')]);
//}
//
//// Password Reset...
//if (Features::enabled(Features::resetPasswords())) {
//    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
//        ->middleware(['guest:' . config('fortify.guard')]);
//
//    Route::post('/reset-password', [NewPasswordController::class, 'store'])
//        ->middleware(['guest:' . config('fortify.guard')]);
//}
//
//Route::group(['middleware' => 'auth:sanctum'], function () {
//    // Authentication...
//    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
//
//    // Password Confirmation...
//    Route::post('/user/confirm-password', [ConfirmablePasswordController::class, 'store']);
//    Route::get('/user/confirmed-password-status', [ConfirmedPasswordStatusController::class, 'show']);
//
//    // Two Factor Authentication...
//    if (Features::enabled(Features::twoFactorAuthentication())) {
//        $twoFactorMiddleware = Features::optionEnabled(Features::twoFactorAuthentication(), 'confirmPassword')
//            ? ['password.confirm']
//            : [];
//
//        // Enable 2FA Confirmation
//        Route::post('/user/two-factor-authentication', [TwoFactorAuthenticationController::class, 'store'])
//            ->middleware($twoFactorMiddleware);
//
//        // Disable 2FA
//        Route::delete('/user/two-factor-authentication', [TwoFactorAuthenticationController::class, 'destroy'])
//            ->middleware($twoFactorMiddleware);
//
//        // Confirm 2FA Code
//        Route::post('/user/confirmed-two-factor-authentication', [ConfirmedTwoFactorAuthenticationController::class, 'store'])
//            ->middleware($twoFactorMiddleware);
//
//        // Two Factor Authentication QR Code
//        Route::get('/user/two-factor-qr-code', [TwoFactorQrCodeController::class, 'show'])
//            ->middleware($twoFactorMiddleware);
//
//        // Two Factor Recovery Codes
//        Route::get('/user/two-factor-recovery-codes', [RecoveryCodeController::class, 'index'])
//            ->middleware($twoFactorMiddleware);
//
//        // Generate New Recovery Codes
//        Route::post('/user/two-factor-recovery-codes', [RecoveryCodeController::class, 'store'])
//            ->middleware($twoFactorMiddleware);
//    }
//
//    // Update Profile Information...
//    if (Features::enabled(Features::updateProfileInformation())) {
//        Route::put('/user/profile-information', [ProfileInformationController::class, 'update']);
//    }
//
//    // Update Passwords...
//    if (Features::enabled(Features::updatePasswords())) {
//        Route::put('/user/password', [PasswordController::class, 'update']);
//    }
//
//    // Email Verification...
//    if (Features::enabled(Features::emailVerification())) {
//        if ($enableViews) {
//            Route::get('/email/verify', [EmailVerificationPromptController::class, '__invoke'])
//                ->middleware([config('fortify.auth_middleware', 'auth').':'.config('fortify.guard')])
//                ->name('verification.notice');
//        }
//
//        Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
//            ->middleware([config('fortify.auth_middleware', 'auth').':'.config('fortify.guard'), 'signed', 'throttle:'.$verificationLimiter])
//            ->name('verification.verify');
//
//        Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
//            ->middleware([config('fortify.auth_middleware', 'auth').':'.config('fortify.guard'), 'throttle:'.$verificationLimiter])
//            ->name('verification.send');
//    }
//
//});
