<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('content');
            $table->string('cycle');//周期时间 单位 : 天
            $table->integer('check_counts')->nullable();//打卡次数
            $table->bigInteger('left_time')->nullable();//上次打卡时间
            $table->timestamp('created_at');
            $table->boolean('if_checkin');//本次周期是否已打卡
            $table->boolean('if_open');//是否公开可见
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plans');
    }

};

