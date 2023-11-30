<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Plan extends Model
{
    use HasFactory;
    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'content',
        'user_id',
        'cycle',
        'if_open',
        'if_checkin',
        'check_counts',
        'left_time',
        'created_at'
    ];

    protected $casts = [
        'if_open' => 'boolean',
        'if_checkin'=> 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
